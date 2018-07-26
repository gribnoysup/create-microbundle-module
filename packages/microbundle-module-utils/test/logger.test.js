import stripAnsi from 'strip-ansi';

import { Logger } from '../src/logger';

describe('logger', () => {
  let originalConsole;
  const logger = new Logger('test');

  const getLastLoggerOutput = type => {
    return stripAnsi(
      global.console[type].mock.calls[
        global.console[type].mock.calls.length - 1
      ].join(' ')
    );
  };

  beforeAll(() => {
    originalConsole = global.console;

    global.console = {
      log: jest.fn(),
      warn: jest.fn(),
      error: jest.fn(),
    };
  });

  afterAll(() => {
    global.console = originalConsole;
  });

  describe('fresh', () => {
    it('should create new instance of logger when called', () => {
      const fresh = logger.fresh();

      expect(fresh === logger).toBeFalsy();
      expect(fresh.constructor === logger.constructor).toBeTruthy();
    });
  });

  describe('child', () => {
    it('should create new instance of logger with concatenated name when called', () => {
      const child = logger.child('child');

      expect(child.name).toBe('test/child');
    });
  });

  describe('log', () => {
    it('should console log input with a prefix', () => {
      logger.log('some', 'text', 'and', 'a', 'number:', 123);

      expect(getLastLoggerOutput('log')).toMatchSnapshot();
    });
  });

  describe('info', () => {
    it('should console log input with a prefix and a info sign', () => {
      logger.info('some', 'text', 'and', 'a', 'number:', 123);

      expect(getLastLoggerOutput('log')).toMatchSnapshot();
    });
  });

  describe('warn', () => {
    it('should console warn input with a prefix and a warn sign', () => {
      logger.warn('some', 'text', 'and', 'a', 'number:', 123);

      expect(getLastLoggerOutput('warn')).toMatchSnapshot();
    });
  });

  describe('error', () => {
    it('should console error input with a prefix and a error sign', () => {
      logger.error('some', 'text', 'and', 'a', 'number:', 123);

      expect(getLastLoggerOutput('error')).toMatchSnapshot();
    });
  });
});
