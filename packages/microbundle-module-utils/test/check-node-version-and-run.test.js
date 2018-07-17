import path from 'path';
import child_process from 'child_process';
import checkNodeVersionAndRun from '../src/check-node-version-and-run';

jest.mock('child_process');

describe('checkNodeVersionAndRun', () => {
  let exit, error;

  beforeEach(() => {
    exit = process.exit;
    // eslint-disable-next-line no-console
    error = console.error;

    process.exit = jest.fn();
    // eslint-disable-next-line no-console
    console.error = jest.fn();
  });

  afterEach(() => {
    process.exit = exit;
    // eslint-disable-next-line no-console
    console.error = error;

    if (child_process.fork.mockClear) {
      child_process.fork.mockClear();
    }
  });

  afterAll(() => {
    jest.unmock('child_process');
  });

  it('should run the script if node version is supported', async () => {
    const compatibleModulePath = path.resolve(
      __dirname,
      '__fixtures__',
      'compatible',
      'scripts',
      'index.js'
    );

    await checkNodeVersionAndRun(compatibleModulePath);

    expect(process.exit).toHaveBeenCalledTimes(0);

    expect(child_process.fork).toBeCalledWith(
      compatibleModulePath,
      process.argv.slice(2)
    );
  });

  it('should exit the process with code 1 if node version is not supported', async () => {
    const incompatibleModulePath = path.resolve(
      __dirname,
      '__fixtures__',
      'incompatible',
      'scripts',
      'index.js'
    );

    await checkNodeVersionAndRun(incompatibleModulePath);

    // eslint-disable-next-line no-console
    expect(console.error).toHaveBeenCalledTimes(1);
    expect(process.exit).toBeCalledWith(1);
  });
});
