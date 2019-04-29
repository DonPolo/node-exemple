import express from 'express';
import bodyparser from 'body-parser';

import SendMessageController from '../controllers/ajax.controller';
import SlackController, { events } from '../controllers/slack.controller';

const routes = express.Router();
const urlencodedParser = bodyparser.urlencoded({ extended: false });

// Route to test on web console
routes.get('/ajax/sendmessage', SendMessageController);

// Route used by slack when a new message arrives
routes.post('/slack', SlackController);

// Route used by slack when a new event is triggered like a button click
routes.post('/slackevents', urlencodedParser, events);

export default routes;
