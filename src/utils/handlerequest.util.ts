import dialogflow from './dialogflow.util';
import fulfill from './fulfill.util';
import logger from '../config/logger';

export default async function handleRequest(query: string, num: string = '') {
  const result = await dialogflow(query);
  // TODO change lang depending num
  let response;
  if (!result || result.intent.isFallback) {
    response = "Je n'ai pas bien saisi";
  } else {
    const intent = result.intent;
    const parameters = result.parameters;
    response = await fulfill(intent.displayName, parameters);
    if (!response) {
      response = result.fulfillmentText;
    }
  }
  logger.info(`  Response fulfilled: ${response}`);
  return response;
}
