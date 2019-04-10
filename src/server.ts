import express from 'express';
import HTTPStatus from 'http-status';
import config from './config';
import chalk from 'chalk';
import logger from './config/logger';
import ApiRoutes from './routes';
import middlewaresConfig from './config/middlewares';
import './models/sequelize';

const app = express();

// Wrap all the middlewares with the server
middlewaresConfig(app);

app.use('/api', ApiRoutes);

app.get('/', (req: express.Request, res: express.Response) =>
  res.sendStatus(HTTPStatus.OK),
);

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
