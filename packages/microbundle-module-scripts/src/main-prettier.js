import commander from 'commander';
import prettier from './prettier';

let filePaths = [];

commander
  .name('prettier')
  .arguments('[files...]')
  .option('-w, --write', 'Write changes to files', false)
  .action(files => {
    filePaths = filePaths.concat(files || []);
  })
  .parse(process.argv);

prettier(filePaths, { write: commander.write });
