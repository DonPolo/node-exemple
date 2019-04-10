import express from 'express';

import * as TestController from '../controllers/test.controller';
import { authBasicEnv } from '../utils/auth.util';

const routes = express.Router();

routes.get('/' /*, authBasicEnv*/, TestController.defaultpage);
routes.get('/question' /*, authBasicEnv*/, TestController.question);

export default routes;
