import express from 'express';
import routes from './routes';
import config from './config';
import chalk from 'chalk';
import logger from './config/logger';
import middlewaresConfig from './config/middlewares';

import './models/ecl';
const app = express();

// Wrap all the middlewares with the server
middlewaresConfig(app);

app.use('/', routes);

// We need this to make sure we don't run a second instance
if (!module.parent) {
  app.listen(config.PORT, (err?: Error) => {
    if (err) {
      logger.info(chalk.red('Cannot run!'));
    } else {
      logger.info(
        chalk.green.bold(
          `
        Yep this is working 🍺
        App listen on port: ${config.PORT} 🍕
        Env: ${process.env.NODE_ENV || 'none'} 🦄
      `,
        ),
      );
    }
  });
}

export default app;
