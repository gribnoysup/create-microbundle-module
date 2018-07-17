import path from 'path';
import os from 'os';

import fs from 'fs-extra';
import dirTree from 'directory-tree';

import createModule from '../src/create-module';

describe('createModule', async () => {
  const fixtureModuleDir = path.resolve(os.tmpdir(), 'my-awesome-module');

  beforeAll(async done => {
    await createModule(fixtureModuleDir, {
      target: 'web',
      scriptsVersion: 'create-microbundle-module',
    });

    done();
  });

  it('should create initial files structure', () => {
    const files = [];

    dirTree(
      fixtureModuleDir,
      {
        exclude: /\.git\/.+/,
        normalizePath: true,
      },
      item => {
        files.push(item.path.replace(fixtureModuleDir, 'my-awesome-module'));
      }
    );

    expect(files).toMatchSnapshot();
  });

  it('should create source entry', async () => {
    const entry = await fs.readFile(
      path.join(fixtureModuleDir, 'src', 'my-awesome-module.js'),
      'utf-8'
    );

    expect(entry).toMatchSnapshot();
  });

  it('should create test file', async () => {
    const test = await fs.readFile(
      path.join(fixtureModuleDir, 'test', 'my-awesome-module.test.js'),
      'utf-8'
    );

    expect(test).toMatchSnapshot();
  });

  it('should create .gitignore file', async () => {
    const gitignore = await fs.readFile(
      path.join(fixtureModuleDir, '.gitignore'),
      'utf-8'
    );

    expect(gitignore).toMatchSnapshot();
  });

  it('should create package.json file', async () => {
    const pkg = await fs.readJSON(path.join(fixtureModuleDir, 'package.json'));

    // INFO: package.author is dynamic and depends on git config.
    // To avoid tests failing with unmatched snapshot, we will
    // "delete" author
    delete pkg.author;

    expect(pkg).toMatchSnapshot();
  });

  afterAll(async done => {
    await fs.remove(fixtureModuleDir);

    done();
  });
});
