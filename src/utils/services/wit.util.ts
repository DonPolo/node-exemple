import { Wit } from 'node-wit';

import { ServiceResult, ServiceRequest } from '../types.util';
import config from '../../config';

export default async function(request: ServiceRequest) {
  const result: ServiceResult = {
    response: null,
    intents: [],
    entities: [],
    query: request.msg,
    contexts: request.contexts,
  };

  try {
    const client = new Wit({ accessToken: config.WIT.accesstoken });
    const res = await client.message(request.msg, {});
    let key: string;
    for (key in res.entities) {
      if (key === 'intent') {
        res.entities.intent.forEach((e: any) => {
          result.intents.push({
            name: e.value,
            confidence: e.confidence,
          });
        });
      } else {
        res.entities[key].forEach((e: any) => {
          result.entities.push({
            name: key,
            value: e.value,
          });
        });
      }
    }
    return result;
  } catch (e) {
    return result;
  }
}
