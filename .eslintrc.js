const { configs: jestEslint } = require('eslint-plugin-jest');
const { configs: nodeEslint } = require('eslint-plugin-node');

module.exports = {
  plugins: ['node'],
  extends: ['eslint:recommended', 'plugin:node/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
  },
  env: {
    node: true,
    es6: true,
  },
  overrides: [
    Object.assign({}, jestEslint.recommended, {
      files: ['**/*.test.js', '**/test/**/*.js'],
      env: {
        jest: true,
      },
    }),
    {
      files: ['**/__mocks__/**'],
      env: {
        jest: true,
      },
    },
    {
      files: ['**/{src,test,__mocks__}/**/*.js'],
      parserOptions: {
        sourceType: 'module',
      },
      rules: {
        'node/no-unsupported-features': 0,
      },
    },
  ],
};
