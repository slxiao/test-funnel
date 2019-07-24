import util from 'util';

import { parse } from './util.js'

const exec = util.promisify(require('child_process').exec);

async function getDiffChangedFiles(testFolder, newCommit, oldCommit) {
    const cmd = parse('git --git-dir=%s/.git diff --name-only %s %s', testFolder, newCommit, oldCommit);
    const { stdout, stderr  } = await exec(cmd);
    return stdout.trim().split(/\r?\n/);
  }

export { getDiffChangedFiles };