import express from 'express';

import routes from './routes';

import bodyParser from 'body-parser';
import Twig from 'twig';

import './models/ecl';
const app = express();

app.use(express.static('public'));

app.use(bodyParser.json());
app.use('/', routes);

app.listen(8080);

export default app;
