import express from 'express';
import TestController from '../controllers';
import SendMessageController from '../controllers/ajax.controller';
import SlackController, { events } from '../controllers/slack.controller';
import bodyparser from 'body-parser';
const routes = express.Router();
const urlencodedParser = bodyparser.urlencoded({ extended: false });

routes.all('/', TestController);
routes.get('/ajax/sendmessage', SendMessageController);
routes.post('/slack', SlackController);
routes.post('/slackevents', urlencodedParser, events);
export default routes;
