import querystring from 'querystring';
import config from '../../config';
import { ServiceRequest, ServiceResult } from '../types.util';
import { execrequest } from '../async.util';

export default async function(request: ServiceRequest) {
  const result: ServiceResult = {
    response: null,
    intents: [],
    entities: [],
    query: request.msg,
    contexts: request.contexts,
  };
  try {
    const endpoint =
      'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/';
    const appId = config.LUIS.appId;
    const endpointkey = config.LUIS.endpointKey;
    const queryParams = {
      verbose: true,
      q: request.msg,
      'subscription-key': endpointkey,
    };
    const req = `${endpoint}${appId}?${querystring.stringify(queryParams)}`;
    let res = await execrequest(req);
    res = JSON.parse(res.body);
    res.intents.forEach((e: any) => {
      result.intents.push({
        name: e.intent,
        confidence: e.score,
      });
    });
    result.entities = [];
    res.entities.forEach((e: any) => {
      result.entities.push({
        name: e.type,
        value: e.entity,
      });
    });
    return result;
  } catch (err) {
    return result;
  }
}
