import commander from 'commander';
import lintStaged from './lint-staged';

commander
  .name('lint-staged')
  .option('-d, --debug', 'enable debug mode', false)
  .parse(process.argv);

lintStaged({ debug: !!commander.debug });
