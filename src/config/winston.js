// @flow

/**
 * Create the winston logger instance
 */

import winston from 'winston';
import moment from 'moment';

const prodFormatError = error => error.message;
const devFormatError = error => `${error.message}\n\n${error.stack}\n`;
const formatError = (error: Error, isDev: boolean) =>
  isDev ? devFormatError(error) : prodFormatError(error);

const formatter = (info, isDev) => {
  let msg;
  let meta;
  if (info.message instanceof Error) msg = formatError(info.message, isDev);
  else {
    msg = info.message;
    if (info.meta)
      meta =
        info.meta instanceof Error
          ? formatError(info.meta, isDev)
          : JSON.stringify(info.meta, null, 2);
  }
  msg = meta ? `${msg} ${meta}` : msg;
  return `${moment().format('D/MM/YYYY HH:mm:ss')} ${info.level} ${msg}`;
};

const isDev = process.env.NODE_ENV === 'development';

export const logger = winston.createLogger({
  level: isDev ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    // $FlowFixMe
    winston.format.splat(),
    winston.format.printf(info => formatter(info, isDev))
  ),
  transports: [new winston.transports.Console()]
});
