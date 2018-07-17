#!/usr/bin/env node
/* eslint node/no-unsupported-features: ["error", { version: 4 }] */

var path = require('path');
var checkNodeVersionAndRun = require('microbundle-module-utils')
  .checkNodeVersionAndRun;

var main = require.resolve(path.resolve(__dirname, 'src', 'main'));

checkNodeVersionAndRun(main);
