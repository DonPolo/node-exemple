import express from 'express';
import TestController from '../controllers';
import SendMessageController from '../controllers/ajax.controller';
import SlackController from '../controllers/slack.controller';
const routes = express.Router();

routes.all('/', TestController);
routes.get('/ajax/sendmessage', SendMessageController);
routes.post('/slack', SlackController);

export default routes;
