import watson from 'watson-developer-cloud/assistant/v2';
import config from '../../config';
import { ServiceRequest, ServiceResult } from '../types.util';
import logger from '../../config/logger';

const createSession: any = async (assistant: any, obj: any) => {
  // tslint:disable-next-line: no-unused-expression
  return new Promise((resolve, reject) => {
    assistant.createSession(obj, (err: any, res: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

const sendMessage: any = async (assistant: any, obj: any) => {
  // tslint:disable-next-line: no-unused-expression
  return new Promise((resolve, reject) => {
    assistant.message(obj, (err: any, res: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

export default async function(request: ServiceRequest) {
  const result: ServiceResult = {
    response: null,
    intents: [],
    entities: [],
    query: request.msg,
    contexts: request.contexts,
  };
  try {
    // Create assistant
    const assistant = new watson({
      iam_apikey: config.WATSON.apiKey,
      version: '2018-09-20',
      url: 'https://gateway-lon.watsonplatform.net/assistant/api',
    });
    const assistantId = config.WATSON.assistantId;
    const session = await createSession(assistant, {
      assistant_id: assistantId,
    });
    const sessionId = session.session_id;
    request.contexts.service.watsonId = sessionId;
    const res = await sendMessage(assistant, {
      assistant_id: assistantId,
      session_id: sessionId,
      input: {
        message_type: 'text',
        text: request.msg,
        options: {
          return_context: true,
        },
      },
      contexts: request.contexts.service.watson,
    });
    request.contexts.service.watson = res.context;
    result.response = res.output.generic[0].text;

    res.output.intents.forEach((e: any) => {
      result.intents.push({
        confidence: e.confidence,
        name: e.intent,
      });
    });
    result.entities = [];
    res.output.entities.forEach((e: any) => {
      result.entities.push({
        name: e.entity,
        value: request.msg.substring(e.location[0], e.location[1]),
      });
    });
    return result;
  } catch (err) {
    logger.error(err);
    return result;
  }
}
