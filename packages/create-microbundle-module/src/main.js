import fs from 'fs-extra';
import path from 'path';
import commander from 'commander';

import createModule from './create-module';

let moduleDirectory;

const { name, version } = fs.readJSONSync(
  path.resolve(__dirname, '..', 'package.json')
);

commander
  .name(name)
  .version(version)
  .arguments('<module-directory>')
  .option(
    '-t, --target <target>',
    'Your module target environment: web, node',
    /^(web|node)$/i,
    'web'
  )
  .option(
    '-s, --scripts-version <alternative-version>',
    'Use a non-standard version of microbundle-module-scripts',
    'microbundle-module-scripts'
  )
  .option('-n, --no-commit', 'If present, will skip initial commit', false)
  // TODO: We will need additional bootstrapping for TS (or Reason, when
  // it lands https://github.com/developit/microbundle/pull/142)
  // .option(
  //   '-l, --language',
  //   'Create JavaScript, TypeScript or Reason module',
  //   /^(javascript|typescript|reason)$/i,
  //   'javascript'
  // )
  .action(dir => (moduleDirectory = dir))
  .parse(process.argv);

createModule(moduleDirectory, {
  target: commander.target,
  scriptsVersion: commander.scriptsVersion,
  commit: commander.commit,
});
