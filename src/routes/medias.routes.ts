import express from 'express';

import * as MediasController from '../controllers/medias.controller';
import { authBasicEnv } from '../utils/auth.util';

const routes = express.Router();

routes.post('/twilio' /*, authBasicEnv*/, MediasController.twilioWebHook);
routes.post('/nexmo' /*, authBasicEnv*/, MediasController.nexmoWebHook);
routes.post('/plivo' /*, authBasicEnv*/, MediasController.plivoWebHook);

export default routes;
