const commander = require('commander');

const { version, name } = require('../package');

commander
  .name(name)
  .version(version)
  .command(
    'build',
    'Create minified production build of the module with microbundle'
  )
  .command('eslint [files...]', 'Check code quality with ESLint')
  .command(
    'lint-staged',
    'Run eslint and prettier only for files that are staged in git with the help of lint-staged'
  )
  .command('prettier [files...]', 'Format file(s) with Prettier code formatter')
  .command('test', 'Run module tests')
  .command(
    'watch',
    'Watch module source and create unminified development build every time the source is changing'
  )
  .parse(process.argv);
