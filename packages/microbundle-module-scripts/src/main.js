import path from 'path';
import fs from 'fs-extra';
import commander from 'commander';

const { name, version } = fs.readJSONSync(
  path.resolve(__dirname, '..', 'package.json')
);

commander
  .name(name)
  .version(version)
  .description(
    'a set of useful development tools to manage your tests, builds and dev environment'
  )
  .command(
    'build',
    'create minified production build of the module with microbundle'
  )
  .command('test', 'run test suite with Jest')
  // .command('start', 'run Jest in the watch mode')
  // .command('eslint [files...]', 'Check code quality with ESLint')
  .command('prettier [files...]', 'format file(s) with Prettier code formatter')
  .command(
    'lint-staged',
    'run eslint and prettier only for files that are staged in git with the help of lint-staged'
  )
  .parse(process.argv);
