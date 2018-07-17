import ora from 'ora';
import chalk from 'chalk';
import symbols from 'log-symbols';

class Logger {
  constructor(name) {
    this.name = name;
    this.spinner = ora();
  }

  __stringifyArgsWithPrefix(args) {
    const str = args
      .map(a => a.toString())
      .join(' ')
      .trim();

    return str
      ? `${this.name ? chalk.dim(`[${this.name}]`) : ''} ${str}`.trim()
      : void 0;
  }

  child(name) {
    return new Logger(`${this.name}/${name}`);
  }

  fresh(name) {
    return new Logger(name);
  }

  log(...args) {
    const message = this.__stringifyArgsWithPrefix(args);

    if (message) {
      // eslint-disable-next-line no-console
      console.log(message);
    } else {
      // eslint-disable-next-line no-console
      console.log();
    }
  }

  info(...args) {
    const message = this.__stringifyArgsWithPrefix(args);

    if (this.spinner.isSpinning) {
      this.spinner.info(message);
    } else {
      // eslint-disable-next-line no-console
      console.log(symbols.info, message);
    }
  }

  success(...args) {
    const message = this.__stringifyArgsWithPrefix(args);

    if (this.spinner.isSpinning) {
      this.spinner.succeed(message);
    } else {
      // eslint-disable-next-line no-console
      console.log(symbols.success, message);
    }
  }

  warning(...args) {
    const message = this.__stringifyArgsWithPrefix(args);

    if (this.spinner.isSpinning) {
      this.spinner.warn(message);
    } else {
      // eslint-disable-next-line no-console
      console.warn(symbols.warning, message);
    }
  }

  error(...args) {
    const message = this.__stringifyArgsWithPrefix(args);

    if (this.spinner.isSpinning) {
      this.spinner.fail(message);
    } else {
      // eslint-disable-next-line no-console
      console.error(symbols.error, message);
    }
  }

  start(...args) {
    this.spinner.start(this.__stringifyArgsWithPrefix(args));
  }

  stop() {
    this.spinner.stop();
  }
}

const defaultLogger = new Logger('microbundle-module');

export default defaultLogger;
