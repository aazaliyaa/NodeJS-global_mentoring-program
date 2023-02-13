import process from 'node:process';
import logger from '../logger.js';

export function logServiceMethodAndArgs(req, res) {
  if (Object.keys(req.query).length !== 0) {
    logger.debug(`req.method ${req.method}, args: ${JSON.stringify(req.query)}`);
  } else {
    logger.debug(`req.method ${req.method}`);
  }
}

export function handleUncaughtException(res) {
  res.status(500);
  process.on('uncaughtException', (err) => {
    logger.error('Uncaught exception: ', err);
  });
}

export function handleUnhandledRejection(res) {
  res.status(500);
  process.on('unhandledRejection', () => {
    logger.error('Unhandled Rejection occured');
  });
}
