# test-funnel

<p align="center">
	<img alt="Last version" src="https://img.shields.io/github/tag/slxiao/test-funnel.svg?style=flat-square" />
	<a href="https://travis-ci.org/slxiao/test-funnel">
		<img alt="Build Status" src="http://img.shields.io/travis/slxiao/test-funnel/master.svg?style=flat-square" />
	</a>
	<a href="https://www.npmjs.org/package/test-funnel">
		<img alg="NPM Status" src="http://img.shields.io/npm/dm/test-funnel.svg?style=flat-square" />
	</a>
</p>

**test-funnel** is an Javascript unit test selector. It can dynamically select test cases that are impacted by modified source files for execution, thus improving test efficiency and saving developer time. Generally speaking, it is one kind of [Regression Test Selection](https://users.oden.utexas.edu/~sbiswas/files/papers/informaticasurvey.pdf) technology.

Some key points of **test-funnel**:
- It supports both Mocha and Jest frameworks
- Case selection algorithm is built on the awesome [madge](https://github.com/pahen/madge) library
- Support specify commits for changed files extraction
- Support extration, selection and exectution in one command

[中文介绍](https://mp.weixin.qq.com/s/oq3-mJ7cA6f_lK0SviMVyw)

# Installation
```shell
$ npm -g install test-funnel
```
# CLI Usgae
After installed, command `test-funnel` will be available. Run command `test-funnel -h` to get help guidelines.
```shell
Usage: test-funnel [options]

Options:
  -V, --version                   output the version number
  -b, --basefolder <path>         folder of git repository, default: ./
  -t, --testfolder <path>         folder of test files, default: test
  -e, --testfileextention <name>  extention of test files, default: test.js
  -n, --newcommit <name>          new commit for comparison, default: HEAD~0
  -o, --oldcommit <name>          old commit for comparison, default: HEAD~1
  -r, --runner <name>             test runner, could be one of jest/mocha, not trigger runner if not specified
  -h, --help                      output usage information
```

# API Usage
```js
var Funnel = require('test-funnel');
​
Funnel ({
    baseFolder: "./",
    testFolder: "test",
    testFileExtention: "test.js",
    newCommit: "HEAD~0",
    oldCommit: "HEAD~1",
    runner: ""
});
```
# License
MIT License
