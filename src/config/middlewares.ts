import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import expressWinston from 'express-winston';
import methodOverride from 'method-override';
import helmet from 'helmet';

const isDev = process.env.NODE_ENV === 'development';
const isTest = process.env.NODE_ENV === 'test';

export default (app: express.Application) => {
  app.use(express.static('public'));
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(helmet());
  // app.use(expressStatusMonitor());
  app.use(methodOverride());
  if (isDev && !isTest) {
    app.use(morgan('dev'));
    expressWinston.requestWhitelist.push('body');
    expressWinston.responseWhitelist.push('body');
  }
};
