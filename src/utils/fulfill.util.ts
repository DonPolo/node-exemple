import {
  Intent,
  FulfillRequest,
  FulfillResult,
  IntentResult,
  ParseResponseRequest,
  ParsedResponse,
  Contexts,
} from './types.util';
import config from '../config';
import '../config/i18n';
import intentRegister from './fulfill/register.intent';
import intentDefault from './fulfill/default.intent';
import intentInfos from './fulfill/infos.intent';
import i18n from 'i18next';
import { clone } from './func.util';

/**
 * Find and return the most probable response
 * @param result the intents and entities
 * @param contexts the diferent contexts
 * @param types the types supported by the platform
 * @param lang the level of language for the response (fr-tu or fr-vous)
 */
export default async function(request: FulfillRequest): Promise<FulfillResult> {
  // Get all known intents
  const intents: Intent[] = getConfig();
  const intentMap = new Map();
  intents.forEach(intent => {
    intentMap.set(intent.name, intent.func);
  });

  // Create an array with all intent responses
  const intentsRes: IntentResult[] = [];
  // Get all intents
  await request.result.intents.reduce(async (previous, e) => {
    await previous;
    let res: IntentResult;
    if (!intentMap.has(e.name)) {
      if (request.result.response) {
        res = {
          response: {
            intent: '',
            type: '',
            responses: [
              {
                text: {
                  'fr-tu': [request.result.response],
                  'fr-vous': [request.result.response],
                },
              },
            ],
          },
          contexts: request.result.contexts,
          confidence: 0.01,
        };
      }
      res = await intentDefault.fallback({
        entities: request.result.entities,
        contexts: clone(request.result.contexts),
        confidence: e.confidence,
        query: request.result.query,
      });
    } else {
      res = await intentMap.get(e.name)({
        entities: request.result.entities,
        contexts: clone(request.result.contexts),
        confidence: e.confidence,
        query: request.result.query,
      });
    }
    if (res) {
      intentsRes.push(res);
    }
  }, Promise.resolve());

  // Get the most probable one
  let intentResult: IntentResult = await intentDefault.fallback({
    entities: request.result.entities,
    contexts: clone(request.result.contexts),
    confidence: 0.01,
    query: request.result.query,
  });
  intentsRes.forEach(e => {
    if (e && intentResult.confidence < e.confidence) {
      intentResult = e;
    }
  });

  // Parse the response
  const parseResponseRequest: ParseResponseRequest = {
    intentResult,
    acceptedtypes: request.acceptedtypes,
    lang: request.lang,
  };
  const response: ParsedResponse = await parseResponse(parseResponseRequest);

  // Return the fulfill result
  const result: FulfillResult = {
    response,
    contexts: intentResult.contexts,
  };
  return result;
}

/**
 * Get the match between intents name and function to call
 */
function getConfig(): Intent[] {
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

/**
 * Return the response with the good language and random texts
 * @param response the full response
 * @param types the accepted types
 * @param lang the level of language
 */
async function parseResponse(
  request: ParseResponseRequest,
): Promise<ParsedResponse> {
  // Get the responses array
  const res = request.intentResult.response.responses;
  const types = request.acceptedtypes;
  const lang = request.lang;
  // Create parsed response
  const newres: ParsedResponse = {
    responses: [],
  };
  // Build it
  res.reduce(async (previous: any, r: any) => {
    await previous;
    if (!r.desc) {
      if (types.includes(Object.keys(r)[0])) {
        if (typeof r.text !== 'undefined') {
          const texts = r[lang];
          const text = texts[Math.floor(Math.random() * texts.length)];
          const realtxt = await getTextFormated(
            text,
            request.intentResult.contexts,
          );
          newres.responses.push({
            text: realtxt,
          });
        } else if (typeof r.media !== 'undefined') {
          newres.responses.push({
            media: r.media,
          });
        } else if (typeof r.link !== 'undefined') {
          newres.responses.push({
            link: r.link,
          });
        } else if (typeof r.btn !== 'undefined') {
          const btns = r[lang];
          const realbtns: any[] = [];
          btns.reduce(async (prev: any, b: any) => {
            await prev;
            realbtns.push({
              text: await getTextFormated(
                b.text,
                request.intentResult.contexts,
              ),
              value: b.value,
            });
          }, Promise.resolve());
          newres.responses.push({
            btn: {
              btns: realbtns,
              nextaction: r.nextaction,
            },
          });
        } else if (typeof r.dropdown !== 'undefined') {
          const opts = r[lang];
          const realopts: any[] = [];
          opts.reduce(async (prev: any, b: any) => {
            await prev;
            realopts.push({
              text: await getTextFormated(
                b.text,
                request.intentResult.contexts,
              ),
              value: b.value,
            });
          }, Promise.resolve());
          newres.responses.push({
            dropdown: {
              opts: realopts,
              nextaction: r.nextaction,
            },
          });
        }
      }
    }
  }, Promise.resolve());
  return newres;
}

/**
 * Return a text with the parameters inside
 * @param text the text you want to format
 * @param params the parameters for your text
 */
async function getTextFormated(text: string, params: Contexts) {
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
  return i18n.t('key', {
    site: params.site,
    user: params.user,
    concierges: params.concierges,
  });
}
