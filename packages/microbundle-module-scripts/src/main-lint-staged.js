const path = require('path');
const commander = require('commander');
const child_process = require('child_process');

const lintStagedBinPath = require.resolve('lint-staged');

const configPath = path.resolve(__dirname, '..', 'config', 'lint-staged');

commander
  .name('lint-staged')
  .option('-d, --debug', 'Enable debug mode', false)
  .parse(process.argv);

const run = () => {
  child_process.fork(
    lintStagedBinPath,
    ['--config', configPath, commander.debug && '--debug'].filter(Boolean)
  );
};

run();
