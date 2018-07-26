const commander = require('commander');

const { version, name } = require('../package');

commander
  .name(name)
  .version(version)
  .command(
    'build',
    'Create minified production build of the module with microbundle'
  )
  .command('test', 'Run module tests')
  .command('start', 'Run Jest in the watch mode')
  .command('eslint [files...]', 'Check code quality with ESLint')
  .command('prettier [files...]', 'Format file(s) with Prettier code formatter')
  .command(
    'lint-staged',
    'Run eslint and prettier only for files that are staged in git with the help of lint-staged'
  )
  .parse(process.argv);
