"use strict";

import { recFindByExt, twoArrayOverlap } from './util.js'
import { getDiffChangedFiles } from './diff.js'
import { getBulkDependencies } from './dependency.js'

async function select(config) {
    let changedFiles = await getDiffChangedFiles(config.baseFolder, config.newCommit, config.oldCommit);
    console.log("git changed files are: " + changedFiles)
    const testFiles = recFindByExt(config.baseFolder + config.testFolder, config.testFileExtention);
    let fileDependencies = await getBulkDependencies(testFiles);
    var selectedCaseFiles = [];
    var obj;

    for (obj of fileDependencies) {
        if (twoArrayOverlap(changedFiles, obj[Object.keys(obj)[0]])) {
            selectedCaseFiles.push(Object.keys(obj)[0]);
        }
    }
    return selectedCaseFiles;
}

export { select };
