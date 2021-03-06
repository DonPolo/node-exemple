import {
  ServiceRequest,
  ServiceResult,
  ResultEntity,
} from '../../../types/types.util';
import config from '../../config';
import { execrequest } from '../async.util';
import uuid from 'uuid';
import logger from '../../config/logger';

/**
 * Get intents and entities from SAP relative to a message
 * @param msg the user message
 * @param contexts the contexts (not usefull here but can be for dialogflow or watson)
 * @returns an object containing the result and the contexts
 */
export default async function(request: ServiceRequest) {
  const result: ServiceResult = {
    response: null,
    intents: [],
    entities: [],
    query: request.msg,
    contexts: request.contexts,
  };
  try {
    let res = await execrequest({
      url: 'https://api.cai.tools.sap/build/v1/dialog',
      method: 'POST',
      headers: {
        Authorization: `Token ${config.SAP.token}`,
        'Content-Type': 'application/json',
      },
      json: {
        message: {
          content: request.msg,
          type: 'text',
        },
        conversation_id: uuid(),
      },
    });
    res = res.body.results.nlp;
    res.intents.forEach((e: any) => {
      result.intents.push({
        name: e.slug,
        confidence: e.confidence,
      });
    });

    let key: string;
    // tslint:disable-next-line: forin
    for (key in res.entities) {
      res.entities[key].forEach((e: any) => {
        const ent: ResultEntity = {
          name: key,
          value: e.raw,
        };
        if (e.type) {
          ent.type = e.type;
        }
        result.entities.push(ent);
      });
    }
    return result;
  } catch (e) {
    logger.error(e);
    return result;
  }
}
