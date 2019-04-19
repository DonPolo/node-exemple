import { Contexts, Result } from '../types.util';
import config from '../../config';
import { execrequest } from '../async.util';
import uuid from 'uuid';
export default async function(msg: string, contexts: Contexts) {
  const result: Result = {
    response: null,
    intents: [],
    entities: [],
    query: msg,
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
          content: msg,
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
        result.entities.push({
          name: key,
          value: e.raw,
        });
      });
    }
    return { result, contexts };
  } catch (e) {
    return { result, contexts };
  }
}
