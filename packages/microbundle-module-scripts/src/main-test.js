import commander from 'commander';

import test from './test';

commander
  .name('test')
  .option('-w, --watch', 'starts Jest in watch mode', false)
  .parse(process.argv);

test({ watch: !!commander.watch });
