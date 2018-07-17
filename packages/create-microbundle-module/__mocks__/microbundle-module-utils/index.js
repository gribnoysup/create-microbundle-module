const mockLogger = {
  fresh: () => mockLogger,
  log: () => {},
  // INFO: The only method we will leave in logger
  // is console.error, otherwise some errors would
  // be 'swallowed' silently
  //
  // eslint-disable-next-line no-console
  error: console.error,
  warning: () => {},
  success: () => {},
  start: () => {},
};

export const logger = mockLogger;
