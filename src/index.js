// @flow

/* eslint-disable no-console */
/**
 * Server setup
 */
import express from 'express';
import chalk from 'chalk';
import HTTPStatus from 'http-status';

import middlewaresConfig from './config/middlewares';
import constants from './config/constants';
import ApiRoutes from './routes';
import { ensureIndexes } from './models';

// Ensure all indexes for nedb
ensureIndexes();

const app = express();

// Wrap all the middlewares with the server
middlewaresConfig(app);

// Add the apiRoutes stack to the server
app.use('/api', ApiRoutes);
app.get('/', (req: $Subtype<express$Request>, res: express$Response) =>
  res.sendStatus(HTTPStatus.OK)
);

// We need this to make sure we don't run a second instance
if (!module.parent) {
  app.listen(constants.PORT, (err: ?Error) => {
    if (err) {
      console.log(chalk.red('Cannot run!'));
    } else {
      console.log(
        chalk.green.bold(
          `
          Yep this is working 🍺
          App listen on port: ${constants.PORT} 🍕
          Env: ${process.env.NODE_ENV || 'none'} 🦄
        `
        )
      );
    }
  });
}
export default app;
