'use strict';

import { select } from './select.js';

const defaultConfig = {
    baseFolder: "./",
    testFolder: "test",
    testFileExtention: "test.js",
    newCommit: "HEAD~0",
    oldCommit: "HEAD~1"
}

class Funnel {
    constructor(config) {
        this.config = Object.assign({}, defaultConfig, config);

        return select(this.config).then((res) => {
            this.selected = res;
            return this;
        })
    }
}

module.exports = (config) => new Funnel(config);
