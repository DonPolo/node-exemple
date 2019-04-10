import winston from 'winston';
import moment from 'moment';

import config from '.';

const isDev = process.env.NODE_ENV === 'development';

const prodFormatError = (error: Error) => error.message;
const devFormatError = (error: Error) => `${error.message}\n\n${error.stack}\n`;

const formatError = (error: Error) =>
  isDev ? devFormatError(error) : prodFormatError(error);

const formatter = (info: any) => {
  let msg;
  let meta;
  if (info.message instanceof Error) msg = formatError(info.message);
  else {
    msg = info.message;
    if (info.meta)
      meta =
        info.meta instanceof Error
          ? formatError(info.meta)
          : JSON.stringify(info.meta, null, 2);
  }
  msg = meta ? `${msg} ${meta}` : msg;
  return `${moment().format('D/MM/YYYY HH:mm:ss')} ${info.level} ${msg}`;
};

const logger = winston.createLogger({
  level: isDev || config.DEBUG ? 'debug' : 'info',
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.printf(info => formatter(info)),
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
