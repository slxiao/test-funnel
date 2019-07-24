'use strict';

import { select } from './select.js';

const defaultConfig = {
    baseFolder: "/root/workspace/gitlabe2/siteoam/",
    testFolder: "test",
    testFileExtention: "Mocha.js",
    newCommit: "d0b350e9e0e69a578f1a391c9dcf0b61dcb403e0",
    oldCommit: "a453ee288072ed23c0fc6fb6f6abd16ff03ceb04"
}

class Funnel {
    constructor(config) {
        this.config = Object.assign({}, defaultConfig, config);

        return select(this.config).then((res) => {
            this.selected = res.selected;
            return this;
        })
    }

    obj() {
        return this.selected;
    }
}

module.exports = (config) => new Funnel(config);
