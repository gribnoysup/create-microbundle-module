const path = require('path');
const runner = path.resolve(__dirname, '..', 'index.js');

module.exports = {
  linters: {
    '{src,test}/**/*.{js,ts,jsx,tsx}': [
      `node ${runner} prettier --write`,
      `node ${runner} eslint --fix`,
      'git add',
    ],
    '*.{md,json}': [`node ${runner} prettier --write`, 'git add'],
  },
  ignore: ['**/dist/**/*.js'],
};
