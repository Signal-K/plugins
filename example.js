#!/usr/bin/env node

const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');

const files = require('./lib/files');
const getFiles = require('./lib/files/get-file');
const { askForFile } = require('./lib/files/get-file');
4
console.log(
    chalk.yellow(
        figlet.textSync('Signal-K', { horizontalLayout: 'full' })
    )
);

askForFile();
//run();