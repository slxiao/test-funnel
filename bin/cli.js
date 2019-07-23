#!/usr/bin/env node

import proces from 'process';

const program = require('commander');
const version = require('../package.json').version;

program
  .version(version)
  .usage('[options] <src...>')
  .option('--debug', 'turn on debug output', false)
  .parse(process.argv);

console.log("hello")
