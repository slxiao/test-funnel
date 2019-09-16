'use strict';

import { select } from './select.js';

const defaultConfig = {
    baseFolder: "./",
    testFolder: "test",
    testFileExtention: "test.js",
    newCommit: "HEAD~0",
    oldCommit: "HEAD~1",
    runner: ""
}

async function handle(res, config) {
    console.log(res, config)
    if (res != []) {
        console.log("Selected cases are: " + res);
        if (config.runner == "") {
            console.log("Test runner not specified, not run cases");
        }
        else if(config.runner == "jest") {
            console.log("jest is used as test runner");
            var process = require('child_process');
            let cmd = 'jest --testPathPattern=' + res.join("|");
            console.log("start to run tests, command: " + cmd);
            process.execSync(cmd, function (err,stdout,stderr) {
                if (err) {
                    console.log("\n"+stderr);
                } else {
                    console.log(stdout);
                }
            });
        }
        else if(config.runner == "mocha") {
            console.log("mocha is used as test runner");
            var process = require('child_process');
            let cmd = 'mocha -g=' + res.join("|");
            console.log("start to run tests, command: " + cmd);
            process.execSync(cmd, function (err,stdout,stderr) {
                if (err) {
                    console.log("\n"+stderr);
                } else {
                    console.log(stdout);
                }
            });
        }
    }
    else {
        console.log("No case impacted.")
    }
}

class Funnel {
    constructor(config) {
        this.config = Object.assign({}, defaultConfig, config);

        let selectedCases = [];
        select(this.config)
            .then((res) => {
                selectedCases = res;
                console.log("selected cases are: " + selectedCases);
                handle(selectedCases, this.config)
                    .then(() => console.log("done"))
                    .catch(() => console.log("error occured"))
            })
            .catch(() => console.log("error occured"))
    }
}

module.exports = (config) => new Funnel(config);
