const commander = require('commander');
const prettier = require('prettier');
const fs = require('fs-extra');

const logger = require('microbundle-module-utils').logger.child('prettier');

const config = require('../config/prettier');

const getPrettierConfig = async filePath => {
  const localConfig = await prettier.resolveConfig(filePath);
  return { ...config, ...localConfig };
};

const prettify = paths => {
  paths.forEach(async filePath => {
    const exists = await fs.pathExists(filePath);

    if (!exists) {
      logger.warning(`Can't prettify file ${filePath}. File doesn't exists`);
      return;
    }

    const config = await getPrettierConfig(filePath);
    const info = await prettier.getFileInfo(filePath);

    if (info.ignored === false) {
      const source = await fs.readFile(filePath, 'utf-8');
      const formatted = await prettier.format(source, {
        ...config,
        parser: info.inferredParser,
      });

      if (commander.write === true) {
        await fs.writeFile(filePath, formatted);
      }
    }
  });
};

let filePaths = [];

commander
  .name('prettier')
  .arguments('[files...]')
  .option('-w, --write', 'Write changes to files')
  .action(files => {
    filePaths = filePaths.concat(files || []);
  })
  .parse(process.argv);

prettify(filePaths);
