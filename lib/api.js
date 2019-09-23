'use strict';

import { select } from './select.js';
import { exec } from 'child_process'

const defaultConfig = {
    baseFolder: "./",
    testFolder: "test",
    testFileExtention: "test.js",
    newCommit: "HEAD~0",
    oldCommit: "HEAD~1",
    runner: ""
}

async function run(res, config) {
    await new Promise((resolve, reject) => {
        let cmd = config.runner == "jest" ? 'jest --rootDir=' + config.testFolder + ' --testPathPattern=' + res.join("|") : 'mocha -g=' + res.join("|");
        console.log("start to run tests, command: " + cmd);
        exec(cmd, function(error, stdout, stderr) {
            console.log('stdout: ' + stdout);
            console.log('stderr: ' + stderr);
            if (error !== null) {
                console.log('exec error: ' + error);
                // Reject if there is an error:
                return reject(error);
            }
            // Otherwise resolve the promise:
            resolve();
        });
    });
}

class Funnel {
    constructor(config) {
        this.config = Object.assign({}, defaultConfig, config);

        select(this.config)
            .then((res) => {
                console.log(res, config)
                if (res.length) {
                    if (config.runner == "") {
                        console.log("Test runner not specified, not run cases");
                    }
                    else if(config.runner == "jest" || config.runner == "mocha") {
                        console.log(config.runner + " is used as test runner");
                        run(res, this.config)
                            .then(() => console.log("done"))
                            .catch(() => console.log("error occured"))
                    }
                }
                else {
                    console.log("No case impacted.")
                }
                })
            .catch(() => console.log("error occured"))
    }
}

module.exports = (config) => new Funnel(config);
