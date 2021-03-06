import path from 'path';
import fs from 'fs';

// Make sure any symlinks in the project folder are resolved:
// https://github.com/facebookincubator/create-react-app/issues/637
// https://github.com/jaredpalmer/razzle/blob/e77c8e7f6410c9a645daedd90c987ad61f7a2392/packages/razzle/config/paths.js#L10
const appDirectory = fs.realpathSync(process.cwd());

const resolveApp = (relativePath = '.', ...args) =>
  path.resolve(appDirectory, relativePath, ...args);

const resolveOwn = (relativePath = '.', ...args) =>
  path.resolve(__dirname, '..', relativePath, ...args);

const resolveSrc = (relativePath = '.', ...args) =>
  path.resolve(__dirname, relativePath, ...args);

const nodePaths = (process.env.NODE_PATH || '')
  .split(process.platform === 'win32' ? ';' : ':')
  .filter(Boolean)
  .filter(folder => !path.isAbsolute(folder))
  .map(resolveApp);

export default {
  nodePaths: nodePaths,
  ownPath: resolveOwn(),
  appPath: resolveApp(),
  runnerPath: resolveOwn('index.js'),
  ownPrettierConfig: resolveSrc('config', 'prettier'),
  appPrettierConfig: resolveApp('prettier.config.js'),
  ownLintStagedConfig: resolveSrc('config', 'lint-staged'),
  appLintStagedConfig: resolveApp('lint-staged.config.js'),
  ownEslintConfig: resolveSrc('config', 'eslint'),
  appEslintConfig: resolveApp('.eslintrc.js'),
  lintStagedBin: require.resolve('lint-staged'),
  // INFO: These escape hatches should be used only for testing purposes
  __updateAppPaths(newPath) {
    this.appPath = path.resolve(newPath);
    this.appPrettierConfig = path.resolve(newPath, 'prettier.config.js');
    this.appLintStagedConfig = path.resolve(newPath, 'lint-staged.config.js');
    this.appEslintConfig = path.resolve(newPath, '.eslintrc.js');
  },
  __resetAppPaths() {
    this.__updateAppPaths(appDirectory);
  },
};
