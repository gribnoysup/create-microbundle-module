import path from 'path';
import programm from 'commander';
import fs from 'fs-extra';
import execa from 'execa';
import Git from 'simple-git/promise';
import semver from 'semver';

import camelCase from 'camelcase';
import validateName from 'validate-npm-package-name';

import { logger as defaultLogger } from 'microbundle-module-utils';

const git = Git();
const logger = defaultLogger.fresh();

const replaceModuleName = (str, moduleName) =>
  str
    .replace(/\$moduleName/g, camelCase(moduleName))
    .replace(/\$module-name/g, moduleName);

const getTemplateByName = async templateName => {
  const content = await fs.readFile(
    path.join(__dirname, '..', 'templates', templateName),
    'utf-8'
  );

  return content;
};

const createModule = async (
  moduleDirectory,
  { target, scriptsVersion } = {}
) => {
  if (!moduleDirectory || typeof moduleDirectory !== 'string') {
    logger.warning(
      `Please specify the project directory: $ ${programm.name()} ./my-awesome-module`
    );
    return;
  }

  moduleDirectory = moduleDirectory.trim();

  const modulePath = path.resolve(process.cwd(), moduleDirectory);
  const moduleName = path.basename(modulePath);

  let isGitAvailable = true;

  const { errors, warnings, validForNewPackages: validName } = validateName(
    moduleName
  );

  if (validName === false) {
    const messages = [].concat(errors || [], warnings || []);
    logger.error(`Can't create module with the name "${moduleName}":`);
    messages.forEach(m => logger.error(` - ${m}`));

    process.exitCode = 1;
    return;
  }

  const pkg = JSON.parse(
    // INFO: Template for package.json has 'template' added to the name, because
    // otherwise it throws off npm packaging command and excludes the whole 'templates'
    // folder from being published
    //
    // TODO: Create a small reproducible repo and submit an issue to npm
    replaceModuleName(
      await getTemplateByName('template.package.json'),
      moduleName
    )
  );

  pkg.target = target;

  logger.log();
  logger.log(`Creating a new home for module "${moduleName}" in ${modulePath}`);

  try {
    logger.log();
    logger.start(`Generating initial files`);

    const paths = {
      'entry.js': path.join(modulePath, 'src', `${moduleName}.js`),
      'entry.test.js': path.join(modulePath, 'test', `${moduleName}.test.js`),
      '.gitignore': path.join(modulePath, '.gitignore'),
    };

    for (const key in paths) {
      if (paths.hasOwnProperty(key)) {
        const template = await getTemplateByName(key);
        await fs.outputFile(
          paths[key],
          replaceModuleName(template, moduleName)
        );
      }
    }

    logger.success();
  } catch (error) {
    logger.error('Something went wrong while trying to bootstrap project:');
    logger.error(error);

    process.exitCode = 1;
    return;
  }

  try {
    logger.start('Initializing new git repository');

    await git.cwd(modulePath);
    await git.init();

    const name = await git.raw(['config', 'user.name']);
    const email = await git.raw(['config', 'user.email']);

    if (name || email) {
      pkg.author = [name ? name.trim() : '', email ? `<${email.trim()}>` : '']
        .filter(Boolean)
        .join(' ');
    }

    logger.success();
  } catch (error) {
    isGitAvailable = false;
    logger.warning(
      "Couldn't initialize git repo: git hooks creation and first commit will be skipped"
    );
  }

  try {
    logger.start('Installing external dependencies');

    await fs.writeFile(
      path.join(modulePath, 'package.json'),
      JSON.stringify(pkg, null, 2)
    );

    const semverScriptsVersion = semver.valid(scriptsVersion);
    const dependencies =
      semverScriptsVersion !== null
        ? [`microbundle-module-scripts@${semverScriptsVersion}`]
        : [scriptsVersion.trim()];

    if (!process.env.SKIP_DEPENDENCIES_INSTALL_USE_ONLY_FOR_TESTS) {
      await execa('npm', [
        'install',
        '--save-dev',
        '--save-exact',
        ...dependencies,
      ]);
    }

    logger.success();
  } catch (error) {
    logger.log();
    logger.error('Something went wrong while installing dependencies:');
    logger.error(error);

    return;
  }

  if (isGitAvailable === true) {
    logger.start('Creating initial commit');

    await git.add('*');
    await git.commit(
      'Initial commit (bootstrapped with create-microbundle-module) 🚀'
    );

    logger.success();
  }
};

export default createModule;
