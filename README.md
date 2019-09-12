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
- It's based on Mocha framework and Git
- Case selection algorithm is built on the awesome [madge](https://github.com/pahen/madge) library
- Support specify commits for changed files extraction
- Support extration, selection and exectution in one command


# Installation
```shell
$ npm -g install test-funnel
```
# Usgae

# License
MIT License
