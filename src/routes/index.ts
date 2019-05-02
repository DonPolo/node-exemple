import express from 'express';
import HTTPStatus from 'http-status';

import TestRoutes from './test.routes';
import WebappRoutes from './webapp.routes';
import MediasRoutes from './medias.routes';
import APIError from '../utils/error/apierror.util';

const routes = express.Router();

// Default route
routes.get('/', (req: express.Request, res: express.Response) =>
  res.sendStatus(HTTPStatus.OK),
);

// Test routes for the console
routes.use('/test', TestRoutes);

// Medias routes
routes.use('/media', MediasRoutes);

// Webapp routes to modified responses and training
routes.use('/webapp', WebappRoutes);

// Other
routes.all(
  '*',
  (
    _req: express.Request,
    _res: express.Response,
    _next: express.NextFunction,
  ) => _next(new APIError('Not Found!', HTTPStatus.NOT_FOUND)),
);

export default routes;
