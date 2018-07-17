import fs from 'fs';
import path from 'path';
import programm from 'commander';
import createModule from './create-module';

let moduleDirectory;

const { name, version } = fs.readFileSync(
  path.resolve(__dirname, '..', 'package.json')
);

programm
  .name(name)
  .version(version)
  .arguments('<module-directory>')
  .option(
    '-t, --target <target>',
    'Your module target environment: web, node (default web)',
    /^(web|node)$/i,
    'web'
  )
  .option(
    '-s, --scripts-version <alternative-version>',
    'use a non-standard version of microbundle-module-scripts',
    'microbundle-module-scripts'
  )
  // TODO: We will need additional bootstrapping for TS (or Reason, when
  // it lands https://github.com/developit/microbundle/pull/142)
  // .option(
  //   '-l, --language',
  //   'Create JavaScript, TypeScript or Reason module',
  //   /^(javascript|typescript|reason)$/i,
  //   'javascript'
  // )
  .action(dir => (moduleDirectory = dir));

programm.parse(process.argv);

createModule(moduleDirectory, {
  target: programm.target,
  scriptsVersion: programm.scriptsVersion,
});
