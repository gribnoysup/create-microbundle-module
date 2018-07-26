import paths from '../paths';

export default {
  linters: {
    '{src,test}/**/*.{js,ts,jsx,tsx}': [
      `node ${paths.runnerPath} prettier --write`,
      `node ${paths.runnerPath} eslint --fix`,
      'git add',
    ],
    '*.{md,json}': [`node ${paths.runnerPath} prettier --write`, 'git add'],
  },
  ignore: ['**/dist/**/*.js'],
};
