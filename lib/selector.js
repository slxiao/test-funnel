"use strict";

const madge = require("madge");
const testFolder = "./test/";
const testFileExtention = "Mocha.js";
const fs = require('fs');
const path = require('path');

import { recFindByExt, parse, twoArrayOverlap } from 'util.js'
const newCommit = "d0b350e9e0e69a578f1a391c9dcf0b61dcb403e0";
const oldCommit = "a453ee288072ed23c0fc6fb6f6abd16ff03ceb04";
const util = require('util');
const exec = util.promisify(require('child_process').exec);

function getTestFiles() {
    return recFindByExt(testFolder, testFileExtention);
}

function getTestDependentFiles(test) {
    return madge(test).then((res) => {
        var array = Object.keys(res.obj());
        array.pop();
        return array.map(function (i) { return path.join(test, '..', i)});
    });
}

function getDependencies() {
    var testFiles = getTestFiles();

    return Promise.all(
        testFiles.map(
          file => getTestDependentFiles(file).then(
              out => new  Promise((resolve, reject) => {
                resolve({ [file]: out })
              })
          )
        )
    )
}

async function getDiffChangedFiles() {
    const cmd = parse('git diff --name-only %s %s', newCommit, oldCommit);
    const { stdout, stderr  } = await exec(cmd);
    return stdout.trim().split(/\r?\n/);
  }

async function getSelectedCaseFiles() {
    let changedFiles = await getDiffChangedFiles();
    let fileDependencies = await getDependencies();

    var selectedCaseFiles = [];
    var obj;

    for (obj of fileDependencies) {
        if (twoArrayOverlap(changedFiles, obj[Object.keys(obj)[0]])) {
            selectedCaseFiles.push(Object.keys(obj[0]));
        }
    }
    return selectedCaseFiles;
}

//console.log(getSelectedCaseFiles())
const res = getSelectedCaseFiles();
res.then(console.log)
