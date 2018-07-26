import fs from 'fs-extra';

import paths from '../src/paths';
import prettify, { getPrettierConfig } from '../src/prettier';

import fixturePaths from './__fixtures__/paths';

describe('getPrettierConfig', () => {
  afterEach(() => {
    paths.__resetAppPaths();
  });

  it("should resolve own config when application doesn't have any", async () => {
    paths.__updateAppPaths(fixturePaths.basicModule);
    expect(await getPrettierConfig()).toMatchSnapshot();
  });

  it('should resolve app config when application has one', async () => {
    paths.__updateAppPaths(fixturePaths.withPrettierConfig);
    expect(await getPrettierConfig()).toMatchSnapshot();
  });

  it('should return undefined while trying to prettify non-existent file', async () => {
    const output = await prettify(['/__NO_WAY_THIS_EXISTS__.js']);
    expect(output[0]).toBeUndefined();
  });

  it('should return "prettified" source when file exists', async () => {
    paths.__updateAppPaths(fixturePaths.basicModule);

    const output = await prettify([
      fixturePaths.resolve(fixturePaths.basicModule, 'src', 'index.js'),
    ]);

    expect(output[0]).toMatchSnapshot();
  });

  it('should write file if `write` option is passed', async () => {
    paths.__updateAppPaths(fixturePaths.basicModule);

    const spy = jest.spyOn(fs, 'writeFile');

    const src = fixturePaths.resolve(
      fixturePaths.basicModule,
      'src',
      'index.js'
    );

    const output = await prettify([src], { write: true });

    expect(spy).toBeCalledWith(src, output[0]);

    spy.mockRestore();
  });
});
