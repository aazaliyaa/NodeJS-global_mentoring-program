import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'debug',
  format: format.json(),
  transports: [new transports.Console({
    format: format.combine(
      format.colorize(),
      format.simple(),
    ),
  }),
  new transports.File({
    filename: './logs/errors.log',
    handleExceptions: true,
    handleRejections: true,
  })],
  handleExceptions: true,
  handleRejections: true,
  humanReadableUnhandledException: true,
  json: false,
  colorize: true,
  timestamp: true,
  exitOnError: true,
});

export default logger;
