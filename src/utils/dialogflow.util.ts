import config from '../config';
import Dialogflow from 'dialogflow';
import uuid from 'uuid';
import logger from '../config/logger';

const dialogflow = Dialogflow.v2beta1;

export default async function(query: string, lang: string = 'fr-FR') {
  try {
    const sessionId = uuid.v4();
    // Create a new session
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath(
      config.DIALOG_FLOW.projectId,
      sessionId,
    );

    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: query,
          // The language used by the client (en-US)
          languageCode: lang,
        },
      },
    };
    logger.info('Send request');
    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    logger.info('Detected intent');
    const result = responses[0].queryResult;
    if (result.intent) {
      logger.info(`  Intent: ${result.intent.displayName}`);
      return result;
    }
    logger.info(`  No intent matched.`);
    return null;
  } catch (err) {
    return null;
  }
}
