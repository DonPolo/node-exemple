import { Wit } from 'node-wit';

import { Contexts, Result } from '../types.util';
import config from '../../config';

export default async function(msg: string, contexts: Contexts) {
  const result: Result = {
    response: null,
    intents: [],
    entities: [],
    query: msg,
  };

  try {
    const client = new Wit({ accessToken: config.WIT.accesstoken });
    const res = await client.message(msg, {});
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
    return { result, contexts };
  } catch (e) {
    return { result, contexts };
  }
}
