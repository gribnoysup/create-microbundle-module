import path from 'path';

export default {
  basicModule: path.resolve(__dirname, 'basic-module'),
  withEslintConfig: path.resolve(__dirname, 'with-eslint-config'),
  withLintStagedConfig: path.resolve(__dirname, 'with-lint-staged-config'),
  withPrettierConfig: path.resolve(__dirname, 'with-prettier-config'),
  resolve(...args) {
    return path.resolve(...args);
  },
};
