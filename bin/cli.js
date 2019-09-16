#!/usr/bin/env node

'use strict';

import process from 'process';
import program from 'commander';

const version = require('../package.json').version;

program
	.version(version)
	.usage('[options]')
	.option('-b, --basefolder <path>', 'folder of git repository, default: ./')
	.option('-t, --testfolder <path>', 'folder of test files, default: test')
	.option('-e, --testfileextention <name>', 'extention of test files, default: test.js')
	.option('-n, --newcommit <name>', 'new commit for comparison, default: HEAD~0')
	.option('-o, --oldcommit <name>', 'old commit for comparison, default: HEAD~1')
	.option('-r, --runner <name>', 'test runner, could be one of jest/mocha, not trigger runner if not specified')
	.parse(process.argv);

const funnel = require('../lib/api');
const config = {}

let exitCode = 0;

if (program.basefolder) {
	config.baseFolder = program.basefolder;
}

if (program.testfolder) {
	config.testFolder = program.testfolder;
}

if (program.testfileextention) {
	config.testFileExtention = program.testfileextention;
}

if (program.newcommit) {
	config.newCommit = program.newcommit;
}

if (program.oldcommit) {
	config.oldCommit = program.oldcommit;
}

if (program.runner) {
	config.runner = program.runner;
}

funnel(config);