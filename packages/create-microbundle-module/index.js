#!/usr/bin/env node
/* eslint node/no-unsupported-features: ["error", { version: 4 }] */

var path = require('path');
var utils = require('microbundle-module-utils');

var main = require.resolve(path.resolve(__dirname, 'dist', 'main'));

utils.checkNodeVersionAndRun(main);
