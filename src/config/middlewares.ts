import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import expressWinston from 'express-winston';
import methodOverride from 'method-override';
import helmet from 'helmet';
import session from 'express-session';
import twig from 'twig';

const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';
function pad(n: number) {
  return n < 10 ? `0${n}` : n;
}
export default (app: express.Application) => {
  twig.extendFilter('prettyjson', value => {
    return JSON.stringify(value, null, 4);
  });
  twig.extendFilter('prettydate', value => {
    const date = new Date(value);
    return `${pad(date.getDate())}/${pad(
      date.getMonth() + 1,
    )}/${date.getFullYear()} ${pad(date.getHours())}h${pad(date.getMinutes())}`;
  });
  app.use(express.static('assets/dist'));
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(helmet());
  app.set('trust proxy', 1);
  app.use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
      cookie: {},
    }),
  );
  // app.use(expressStatusMonitor());
  app.use(methodOverride());
  if (isDev && !isTest) {
    app.use(morgan('dev'));
    expressWinston.requestWhitelist.push('body');
    expressWinston.responseWhitelist.push('body');
  }
};
