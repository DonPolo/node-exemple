// @flow

/**
 * Configuration of the server middlewares.
 */
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import expressWinston from 'express-winston';
import methodOverride from 'method-override';
import helmet from 'helmet';

export default (app: express.Application) => {
  app.use(compression());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(helmet());
  // app.use(expressStatusMonitor());
  app.use(methodOverride());
  /* app.use(i18n);
  if (isDev && !isTest) {
    app.use(morgan('dev'));
    expressWinston.requestWhitelist.push('body');
    expressWinston.responseWhitelist.push('body');
    app.use(
      expressWinston.logger({
        winstonInstance: logger,
        meta: true,
        msg:
          'HTTP {{req.method}} {{req.url}} {{res.statusCode}} {{res.responseTime}}ms',
        colorStatus: true
      })
    );
  }*/
};
