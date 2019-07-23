"use strict";

import { recFindByExt, twoArrayOverlap } from './util.js'
import { getDiffChangedFiles } from './diff.js'
import { getBulkDependencies } from './dependency.js'

const newCommit = "d0b350e9e0e69a578f1a391c9dcf0b61dcb403e0";
const oldCommit = "a453ee288072ed23c0fc6fb6f6abd16ff03ceb04";
const testFolder = "./test/";
const testFileExtention = "Mocha.js";

function getTestFiles() {
    return recFindByExt(testFolder, testFileExtention);
}

async function select() {
    let changedFiles = await getDiffChangedFiles();
    const testFiles = getTestFiles();
    let fileDependencies = await getBulkDependencies(testFiles);

    var selectedCaseFiles = [];
    var obj;

    for (obj of fileDependencies) {
        if (twoArrayOverlap(changedFiles, obj[Object.keys(obj)[0]])) {
            selectedCaseFiles.push(Object.keys(obj[0]));
        }
    }
    return selectedCaseFiles;
}

export { select };
