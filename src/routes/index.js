// @flow

/**
 * API Routes
 */

import { Router } from 'express';
import HTTPStatus from 'http-status';

import TwilioRoutes from './twilio.routes';
import DialogflowRoutes from './dialogflow.routes';
import logErrorService from '../services/log';
import APIError from '../services/error';

const routes: express$Router = new Router();

routes.use('/twilio', TwilioRoutes);
routes.use('/dialogflow', DialogflowRoutes);

routes.all(
  '*',
  (
    req: $Subtype<express$Request>,
    res: express$Response,
    next: express$NextFunction
  ) => next(new APIError('Not Found!', HTTPStatus.NOT_FOUND, true))
);

routes.use(logErrorService);

export default routes;
