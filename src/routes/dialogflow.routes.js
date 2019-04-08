// @flow

/**
 * Twilio Routes
 */

import { Router } from 'express';

import * as DialogflowController from '../controllers/dialogflow.controller';
import { authBasicEnv } from '../services/auth';

const routes = new Router();

routes.post('/', authBasicEnv, DialogflowController.webhook);

export default routes;
