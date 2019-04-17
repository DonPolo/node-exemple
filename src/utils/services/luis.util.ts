import request from 'request';
import querystring from 'querystring';
import config from '../../config';
import { Result, Contexts } from '../types.util';

const execrequest: any = async (req: string) => {
  // tslint:disable-next-line: no-unused-expression
  return new Promise((resolve, reject) => {
    request(req, (err: any, res: any, body: any) => {
      if (err) {
        reject(err);
      } else {
        resolve({ res, body });
      }
    });
  });
};
export default async function(msg: string, contexts: Contexts) {
  const result: Result = {
    response: null,
    intents: [],
    entities: [],
    query: msg,
  };
  try {
    const endpoint =
      'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/';
    const appId = config.LUIS.appId;
    const endpointkey = config.LUIS.endpointKey;
    const queryParams = {
      verbose: true,
      q: msg,
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
    return { result, contexts };
  } catch (err) {
    return { result, contexts };
  }
}
