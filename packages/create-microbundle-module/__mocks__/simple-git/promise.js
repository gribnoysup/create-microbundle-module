const git = require.requireActual('simple-git/promise')();

const instance = Object.keys(git).reduce((acc, key) => {
  acc[key] = jest.fn();
  return acc;
}, {});

const mock = () => instance;

mock.instance = instance;

module.exports = mock;
