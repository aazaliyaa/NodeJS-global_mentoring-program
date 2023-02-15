import process from 'node:process';
import logger from '../logger.js';

export function logServiceMethodAndArgs(req, res, next) {
  if (Object.keys(req.query).length !== 0) {
    logger.debug(
      `Method name: ${req.method}, arguments: ${JSON.stringify(req.query)}`,
    );
  } else {
    logger.debug(`Method name: ${req.method}`);
  }
  next();
}

export function handleUncaughtException(req, res, next) {
  res.status(500);
  process.on('uncaughtException', (err) => {
    logger.error('Uncaught exception: ', err);
  });
  next();
}

export function handleUnhandledRejection(req, res, next) {
  res.status(500);
  process.on('unhandledRejection', () => {
    logger.error('Unhandled Rejection occured');
  });
  next();
}

export function logControllerErrors(err, req, res, next) {
  if (Object.keys(req.query).length !== 0) {
    logger.error(`Method name: ${req.method}, arguments: ${JSON.stringify(req.query)}, error message: ${err.message}`);
  } else {
    logger.error(`Method name: ${req.method}, error message: ${err.message}`);
  }

  next(err);
}
