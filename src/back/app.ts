import express from 'express';
import routes from './routes';
import middlewaresConfig from './config/middlewares';
import './models/ecl';
const app = express();

// Wrap all the middlewares with the server
middlewaresConfig(app);

app.use('/', routes);

export default app;
