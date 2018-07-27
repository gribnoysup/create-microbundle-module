const path = require('path');
// INFO: We will replace actual file system with
// in-memory implementation
const { vol: volume, fs: memfs } = require('memfs');

const fs = require.requireActual('fs');

// INFO: For this to work properly, we will copy
// all the templates to in-memory volume
const templatesDir = (...pathSegments) =>
  path.resolve(__dirname, '..', '..', 'templates', ...pathSegments);

const templateFiles = fs.readdirSync(templatesDir()).reduce((acc, fileName) => {
  acc[fileName] = fs.readFileSync(templatesDir(fileName), 'utf-8');
  return acc;
}, {});

volume.fromJSON(templateFiles, templatesDir());

module.exports = memfs;
