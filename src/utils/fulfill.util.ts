import { Result, Contexts, Intent, FulfillResponse } from './types.util';
import config from '../config';
import '../config/i18n';
import intentRegister from './fulfill/register.intent';
import intentDefault from './fulfill/default.intent';
import intentInfos from './fulfill/infos.intent';
import i18n from 'i18next';

function clone(src: any) {
  return JSON.parse(JSON.stringify(src));
}

export default async function(
  result: Result,
  contexts: Contexts,
  types: string[],
  lang: string,
) {
  let response: FulfillResponse;
  // Return 'not understand' when no intents
  if (result.intents.length === 0) {
    response = await intentDefault.fallback(
      null,
      contexts,
      0,
      result.query,
      types,
    );
  } else {
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
            response: [{ text: result.response.text, type: 'text' }],
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
    response = intentsRes[0];
    // Get the most probable one
    intentsRes.forEach(e => {
      if (e && response.confidence < e.confidence) {
        response = e;
      }
    });
  }

  response = await parseResponse(response, types, lang);
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

async function parseResponse(
  response: FulfillResponse,
  types: string[],
  lang: string,
) {
  const res = response.response.responses;
  const newres: any[] = [];
  res.reduce(async (previous: any, r: any) => {
    await previous;
    if (!r.desc) {
      if (types.includes(Object.keys(r)[0])) {
        if (typeof r.text !== 'undefined') {
          const texts = r[lang];
          const text = texts[Math.floor(Math.random() * texts.length)];
          const realtxt = await getTextFormated(text, response.params);
          newres.push({
            text: realtxt,
          });
        } else if (typeof r.media !== 'undefined') {
          newres.push({
            media: r.media,
          });
        } else if (typeof r.link !== 'undefined') {
          newres.push({
            link: r.link,
          });
        } else if (typeof r.btn !== 'undefined') {
          const btns = r[lang];
          const realbtns: any[] = [];
          btns.reduce(async (prev: any, b: any) => {
            await prev;
            realbtns.push({
              text: await getTextFormated(b.text, response.params),
              value: b.value,
            });
          }, Promise.resolve());
          newres.push({
            btns: realbtns,
            nextaction: r.nextaction,
          });
        } else if (typeof r.dropdown !== 'undefined') {
          const opts = r[lang];
          const realopts: any[] = [];
          opts.reduce(async (prev: any, b: any) => {
            await prev;
            realopts.push({
              text: await getTextFormated(b.text, response.params),
              value: b.value,
            });
          }, Promise.resolve());
          newres.push({
            dropdown: realopts,
            nextaction: r.nextaction,
          });
        }
      }
    }
  }, Promise.resolve());
  response.response = newres;
  return response;
}

async function getTextFormated(text: string, params: any) {
  await i18n.init({
    lng: 'lang',
    resources: {
      lang: {
        translation: {
          key: text,
        },
      },
    },
  });
  return i18n.t('key', params);
}
