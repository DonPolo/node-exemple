import { Result, Contexts, Intent, FulfillResponse } from './types.util';
import config from '../config';
import '../config/i18n';
import intentRegister from './fulfill/register.intent';
import intentDefault from './fulfill/default.intent';
import intentInfos from './fulfill/infos.intent';

function clone(src: any) {
  return JSON.parse(JSON.stringify(src));
}

export default async function(
  result: Result,
  contexts: Contexts,
  types: string[],
) {
  // Return 'not understand' when no intents
  if (result.intents.length === 0) {
    return await intentDefault.fallback(null, contexts, 0, result.query, types);
  }
  // Get all known intents
  const intents: Intent[] = getConfig();
  const intentMap = new Map();
  intents.forEach(intent => {
    intentMap.set(intent.name, intent.func);
  });
  const intentsRes: FulfillResponse[] = [];
  // Check all intents
  await result.intents.reduce(async (previous, e) => {
    await previous;
    let res: FulfillResponse;
    if (!intentMap.has(e.name)) {
      if (result.response) {
        res = {
          contexts,
          response: { text: result.response.text, type: 'text' },
          confidence: 0.01,
        };
      }
      res = await intentDefault.fallback(
        null,
        contexts,
        0,
        result.query,
        types,
      );
    } else {
      const c: Contexts = clone(contexts);
      res = await intentMap.get(e.name)(
        result.entities,
        c,
        e.confidence,
        result.query,
        types,
      );
    }
    if (res) {
      intentsRes.push(res);
    }
  }, Promise.resolve());
  let response = intentsRes[0];
  // Get the most probable one
  intentsRes.forEach(e => {
    if (e && response.confidence < e.confidence) {
      response = e;
    }
  });
  // Return it
  return response;
}

function getConfig() {
  return [
    {
      name: config.INTENTS.register,
      func: intentRegister.register,
    },
    {
      name: config.INTENTS.registermail,
      func: intentRegister.registerMail,
    },
    {
      name: config.INTENTS.registername,
      func: intentRegister.registerName,
    },
    {
      name: config.INTENTS.registercode,
      func: intentRegister.registerCode,
    },
    {
      name: config.INTENTS.openingtime,
      func: intentInfos.opentime,
    },
    {
      name: config.INTENTS.contact,
      func: intentInfos.contact,
    },
    {
      name: config.INTENTS.services,
      func: intentInfos.services,
    },
    {
      name: config.INTENTS.relaiscolis,
      func: intentInfos.relaiscolis,
    },
    {
      name: config.INTENTS.fallback,
      func: intentDefault.fallback,
    },
  ];
}
