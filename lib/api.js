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
    if (res.length) {
        if (config.runner == "") {
            console.log("Test runner not specified, not run cases");
        }
        else if(config.runner == "jest" || config.runner == "mocha") {
            console.log(config.runner + " is used as test runner");
            var process = require('child_process');
            let cmd = config.runner == "jest" ? 'jest --testPathPattern=' + res.join("|") : 'mocha -g=' + res.join("|");
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

        select(this.config)
            .then((res) => {
                handle(res, this.config)
                    .then(() => console.log("done"))
                    .catch(() => console.log("error occured"))
            })
            .catch(() => console.log("error occured"))
    }
}

module.exports = (config) => new Funnel(config);
