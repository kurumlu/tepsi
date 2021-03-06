#!/usr/bin/env node

const { promisify } = require('util');
const { exec } = require('child_process');

const execAsync = promisify(exec);

const command = "git status --porcelain | awk '{print $2}'";
const [...filesToIgnore] = process.argv;

const exists = item => !!item;

const isNotInList = list => item => {
  const filtered = list.filter(pathToIgnore => item.endsWith(pathToIgnore));
  return filtered.length === 0;
};

const init = async () => {
  const { stdout } = await execAsync(command, {
    cwd: process.cwd(),
  });

  const changedFiles = stdout
    .trim()
    .split('\n')
    .filter(isNotInList(filesToIgnore))
    .filter(exists);

  if (changedFiles.length) {
    console.log(
      `😰  Git shows some files have been changed (ignoring ${filesToIgnore.join(
        ', '
      )}). Changed files: ${changedFiles.join(', ')}`
    );
    process.exit(1);
  }
};

init();
