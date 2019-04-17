import express from 'express';
import TestRoutes from './routes';
import bodyParser from 'body-parser';

import './models/ecl';
const app = express();

app.use(bodyParser.json());
app.use('/', TestRoutes);

app.listen(8080);

export default app;
