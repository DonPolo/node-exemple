import config from './config';
import chalk from 'chalk';
import logger from './config/logger';
import app from './app';

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
