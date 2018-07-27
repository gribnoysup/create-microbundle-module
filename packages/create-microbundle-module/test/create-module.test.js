import os from 'os';
import path from 'path';

import fs from 'fs-extra';
import dirTree from 'directory-tree';

import createModule from '../src/create-module';

jest.mock('fs');

describe('createModule', async () => {
  const fixtureModuleDir = path.resolve(os.tmpdir(), 'my-awesome-module');

  const bootstrapProject = async (options = {}) => {
    return await createModule(fixtureModuleDir, options);
  };

  const removeProject = async () => {
    try {
      await fs.remove(fixtureModuleDir);
    } catch (error) {
      if (error.code && error.code === 'ENOENT') return;
      throw error;
    }
  };

  beforeAll(async done => {
    await bootstrapProject({
      target: 'web',
      scriptsVersion: 'create-microbundle-module',
    });

    done();
  });

  afterAll(async done => {
    await removeProject();
    done();
  });

  it('should create project file structure', async () => {
    const files = [];

    dirTree(fixtureModuleDir, { normalizePath: true }, item => {
      files.push(item.path.replace(fixtureModuleDir, ''));
    });

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

    expect(pkg).toMatchSnapshot();
  });
});
