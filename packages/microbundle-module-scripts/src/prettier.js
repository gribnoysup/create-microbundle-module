import prettier from 'prettier';
import fs from 'fs-extra';
import { logger as defaultLogger } from 'microbundle-module-utils';

import config from './config/prettier';
import paths from './paths';

const logger = defaultLogger.child('prettier');

export const getPrettierConfig = async () => {
  if ((await fs.exists(paths.appPrettierConfig)) === true) {
    logger.info('Using prettier config defined in your module root');
    return require(paths.appPrettierConfig);
  }

  return config;
};

const prettify = async (filePaths, { write } = {}) => {
  const prettierConfig = await getPrettierConfig();

  return await Promise.all(
    filePaths.map(async filePath => {
      const exists = await fs.pathExists(filePath);

      if (exists === false) {
        logger.warn(`Can't prettify file ${filePath}. File doesn't exists`);
        return;
      }

      const info = await prettier.getFileInfo(filePath);

      if (info.ignored === false) {
        const source = await fs.readFile(filePath, 'utf-8');
        const formatted = await prettier.format(source, {
          ...prettierConfig,
          parser: info.inferredParser,
        });

        if (write === true) {
          await fs.writeFile(filePath, formatted);
        }

        return formatted;
      }
    })
  );
};

export default prettify;
