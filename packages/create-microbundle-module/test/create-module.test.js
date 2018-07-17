import path from 'path';
import os from 'os';
import fs from 'fs-extra';
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

  it('should create module directory', async () => {
    expect(await fs.pathExists(fixtureModuleDir)).toBeTruthy();
  });

  it('should init git repo', async () => {
    const gitPath = path.resolve(fixtureModuleDir, '.git');

    expect(await fs.pathExists(gitPath)).toBeTruthy();
  });

  it('should create .gitignore file from template', async () => {
    const gitignorePath = path.resolve(fixtureModuleDir, '.gitignore');

    expect(await fs.pathExists(gitignorePath)).toBeTruthy();
    expect(await fs.readFile(gitignorePath, 'utf-8')).toMatchSnapshot();
  });

  it('should create package.json file from template', async () => {
    const packagePath = path.resolve(fixtureModuleDir, 'package.json');

    expect(await fs.pathExists(packagePath)).toBeTruthy();
    expect(await fs.readFile(packagePath, 'utf-8')).toMatchSnapshot();
  });

  it('should create source entry file from template', async () => {
    const srcPath = path.resolve(
      fixtureModuleDir,
      'src',
      'my-awesome-module.js'
    );

    expect(await fs.pathExists(srcPath)).toBeTruthy();
    expect(await fs.readFile(srcPath, 'utf-8')).toMatchSnapshot();
  });

  it('should create test file from template', async () => {
    const testPath = path.resolve(
      fixtureModuleDir,
      'test',
      'my-awesome-module.test.js'
    );

    expect(await fs.pathExists(testPath)).toBeTruthy();
    expect(await fs.readFile(testPath, 'utf-8')).toMatchSnapshot();
  });

  afterAll(async done => {
    await fs.remove(fixtureModuleDir);

    done();
  });
});
