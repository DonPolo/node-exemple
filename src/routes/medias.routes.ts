import express from 'express';
import bodyparser from 'body-parser';
import { authBasicEnv } from '../utils/auth.util';

import SlackController, { events } from '../controllers/slack.controller';
import SmsController from '../controllers/sms.controller';

const routes = express.Router();
const urlencodedParser = bodyparser.urlencoded({ extended: false });

/* Slack routes */
// Route used by slack when a new message arrives
routes.post('/slack', SlackController);
// Route used by slack when a new event is triggered like a button click
routes.post('/slackevents', urlencodedParser, events);

/* SMS routes */
routes.post('/twilio', authBasicEnv, SmsController.twilio);
routes.post('/nexmo', authBasicEnv, SmsController.nexmo);

export default routes;
