import fs from 'fs-extra';
import microbundle from 'microbundle';
import { logger as defaultLogger } from 'microbundle-module-utils';

import paths from './paths';
import defaultConfig from './config/microbundle';

const logger = defaultLogger.child('build');

const build = async ({ watch, external, cwd } = {}) => {
  logger.info('Starting module build' + (watch ? ' in watch mode' : ''));

  let pkg;

  if (await fs.exists(paths.appPackageJSONPath)) {
    pkg = await fs.readJSON(paths.appPackageJSONPath);
  }

  const config = {
    ...defaultConfig,
    cwd,
    watch,
    external,
    target: pkg.target,
  };

  try {
    const stats = await microbundle(config);
    logger.log(stats);
  } catch (error) {
    logger.error(error);
    process.exitCode = 1;
  }
};

export default build;
