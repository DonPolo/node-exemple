import express from 'express';
import HTTPStatus from 'http-status';

import MediasRoutes from './medias.routes';
import TestRoutes from './test.routes';

import APIError from '../utils/error/apierror.util';
import logger from '../config/logger';
// import logErrorService from '../util/log.util';

const routes = express.Router();

routes.use('/medias', MediasRoutes);

routes.use('/tests', TestRoutes);

routes.all(
  '*',
  (
    _req: express.Request,
    _res: express.Response,
    _next: express.NextFunction,
  ) => _next(new APIError('Not Found!', HTTPStatus.NOT_FOUND)),
);

// routes.use(logErrorService);

export default routes;

//
