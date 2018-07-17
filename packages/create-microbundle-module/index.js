#!/usr/bin/env node
/* eslint node/no-unsupported-features: ["error", { version: 4 }] */

var path = require('path');
var checkNodeVersionAndRun = require('microbundle-module-utils')
  .checkNodeVersionAndRun;

var main = path.resolve(__dirname, 'dist', 'main');

checkNodeVersionAndRun(main);
