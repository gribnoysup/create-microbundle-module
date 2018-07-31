import commander from 'commander';

import build from './build';
import paths from './paths';

/**
 * TODO: Should we allow more microbundle flags?
 *
 *   -i, --entry      Entry module(s)
 *   -o, --output     Directory to place build files into
 *   -f, --format     Only build specified formats  (default es,cjs,umd)
 * + -w, --watch      Rebuilds on any change  (default false)
 *   --target         Specify your target environment  (default node)
 * + --external       Specify external dependencies, or 'none'
 *   --compress       Compress output using UglifyJS  (default true)
 *   --strict         Enforce undefined global context and add "use strict"
 *   --name           Specify name exposed in UMD builds
 * + --cwd            Use an alternative working directory  (default .)
 *   --sourcemap      Generate source map  (default true)
 */

commander
  .name('build')
  .option('-w, --watch', 'rebuilds on any change', false)
  .option(
    '--external <dependencies>',
    "specify external dependencies, or 'none'",
    'none'
  )
  .option('--cwd <path>', 'use an alternative working directory')
  .parse(process.argv);

build({
  watch: !!commander.watch,
  external: commander.external,
  // INFO: Avoid showing terribly long resolved path to the module
  // in the build --help
  cwd: commander.cwd || paths.appPath,
});
