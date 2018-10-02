// @flow

/**
 * Twilio Routes
 */

import { Router } from 'express';

import { authBasicEnv } from '../services/auth';
import * as TwilioController from '../controllers/twilio.controller';

const routes = new Router();

routes.post('/', authBasicEnv, TwilioController.webhook);

/**
 * For ENGIE Escape Game
 */
routes.post('/engie', authBasicEnv, TwilioController.engieGame);
routes.get('/engie-sync', authBasicEnv, TwilioController.engieSync);
routes.get('/engie-fix', authBasicEnv, TwilioController.engieFix);

export default routes;
