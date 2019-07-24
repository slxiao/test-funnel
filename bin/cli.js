#!/usr/bin/env node

'use strict';

import process from 'process';
const program = require('commander');
const rc = require('rc')('funnel');
const version = require('../package.json').version;
const chalk = require('chalk');

program
	.version(version)
	.usage('[options]')
	.option('-t, --testfolder <path>', 'folder of test files')
	.parse(process.argv);

const funnel = require('../lib/api');
const config = Object.assign({}, rc);

program.options.forEach((opt) => {
	const name = opt.name();

	if (program[name]) {
		config[name] = program[name];
	}
});

let exitCode = 0;

delete config._;
delete config.config;
delete config.configs;

if (rc.config) {
	log('using runtime config %s', rc.config);
}

if (program.testfolder) {
	config.testFolder = program.testfolder;
}

new Promise((resolve, reject) => {
	if (program.stdin) {
		let buffer = '';

		process.stdin
			.resume()
			.setEncoding('utf8')
			.on('data', (chunk) => {
				buffer += chunk;
			})
			.on('end', () => {
				try {
					resolve(JSON.parse(buffer));
				} catch (e) {
					reject(e);
				}
			});
	} else {
		resolve(program.args);
	}
})
	.then(() => {
		return funnel(config);
	})
	.catch((err) => {
		console.log('\n%s %s\n', chalk.red('✖'), err.stack);
		process.exit(1);
	});


