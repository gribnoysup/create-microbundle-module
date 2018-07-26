import execa from 'execa';
import fs from 'fs-extra';
import { logger as defaultLogger } from 'microbundle-module-utils';

import paths from './paths';

const logger = defaultLogger.child('lint-staged');

export const getLintStagedConfigPath = async () => {
  let configPath;

  if ((await fs.exists(paths.appLintStagedConfig)) === true) {
    logger.info('Using lint-staged defined in your module root');
    configPath = paths.appLintStagedConfig;
  } else {
    configPath = paths.ownLintStagedConfig;
  }

  return configPath;
};

const lintStaged = async ({ debug }) => {
  const configPath = await getLintStagedConfigPath();

  return await execa(
    paths.lintStagedBin,
    ['--config', configPath, debug && '--debug'].filter(Boolean),
    { cwd: paths.appPath }
  );
};

export default lintStaged;
