import child_process from 'child_process';
import pleaseUpgradeNode from 'please-upgrade-node';
import pkgUp from 'pkg-up';
import chalk from 'chalk';
import symbols from 'log-symbols';

export default function checkNodeVersionAndRun(modulePath) {
  return pkgUp(modulePath).then(function(packagePath) {
    if (packagePath !== null) {
      var pkg = require(packagePath);

      pleaseUpgradeNode(pkg, {
        message: function message(requiredVersion) {
          const version = process.versions.node;
          const message =
            `${symbols.warning}  You are running Node ${version}.\n` +
            `"${pkg.name}" requires Node ${requiredVersion} or higher. ` +
            `Please update your version of Node.`;

          return chalk.yellow(message);
        },
      });
    }

    return child_process.fork(modulePath, process.argv.slice(2));
  });
}
