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

import intentRegister from './fulfill/register.intent';
import intentDefault from './fulfill/default.intent';
import intentInfos from './fulfill/infos.intent';
import intentRequest from './fulfill/request.intent';
import intentTests from './fulfill/tests.intent';

import { clone } from './func.util';
import twig, { Template } from 'twig';

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
            displayname: '',
            responses: [
              {
                text: {
                  fr: [request.result.response],
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
  intentsRes.push(
    await intentRegister.registerName({
      entities: request.result.entities,
      contexts: clone(request.result.contexts),
      confidence: 0.6,
      query: request.result.query,
    }),
  );

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
      name: config.INTENTS.infos,
      func: intentInfos.infos,
    },
    {
      name: config.INTENTS.requestglobal,
      func: intentRequest.global,
    },
    {
      name: config.INTENTS.requestupdate,
      func: intentRequest.details,
    },
    {
      name: config.INTENTS.fallback,
      func: intentDefault.fallback,
    },
    {
      name: 'test-buttons',
      func: intentTests.buttons,
    },
    {
      name: 'test-dropdown',
      func: intentTests.dropdown,
    },
    {
      name: 'test-media',
      func: intentTests.media,
    },
    {
      name: 'test-link',
      func: intentTests.link,
    },
    {
      name: 'test-text',
      func: intentTests.text,
    },
    {
      name: 'test-mix',
      func: intentTests.mix,
    },
    {
      name: 'test-clone',
      func: intentTests.clone,
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
  await res.reduce(async (previous: any, r: any) => {
    await previous;
    if (!r.desc) {
      if (types.includes(Object.keys(r)[0])) {
        if (typeof r.text !== 'undefined') {
          const texts = getTexts(r.text, lang, request.intentResult.contexts);
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
            media: r.media.value,
          });
        } else if (typeof r.link !== 'undefined') {
          newres.responses.push({
            link: r.link.value,
          });
        } else if (typeof r.btn !== 'undefined') {
          let btns = getTexts(r.btn, lang, request.intentResult.contexts);
          if (r.btn.foreach) {
            const b = btns[0];
            const foreach = r.btn.foreach.split(' in ');
            const elem = foreach[0].trim().split(', ');
            btns = [];
            const newtext = reverseBracketsCurlyBraces(b.text);
            const newval = reverseBracketsCurlyBraces(b.value);
            await getProperty(
              request.intentResult.contexts,
              foreach[1].trim(),
            ).reduce(async (prev: any, e: any, key: any) => {
              await prev;
              const obj: any = {};
              if (elem.length > 1) {
                obj[elem[0].trim()] = key;
                obj[elem[1].trim()] = e;
              } else {
                obj[elem[0].trim()] = e;
              }
              const tpl1 = twig.twig({
                data: newtext,
              });
              const txt = await tpl1.renderAsync(obj);
              const tpl2 = twig.twig({
                data: newval,
              });
              const val = await tpl2.renderAsync(obj);
              btns.push({
                followupintent: b.followupintent,
                text: changeBrackets(txt),
                value: changeBrackets(val),
              });
            }, Promise.resolve());
          }
          const realbtns: any[] = [];
          await btns.reduce(async (prev: any, b: any) => {
            await prev;
            realbtns.push({
              text: await getTextFormated(
                b.text,
                request.intentResult.contexts,
              ),
              value: b.value,
              followupintent: b.followupintent,
            });
          }, Promise.resolve());
          newres.responses.push({
            btn: {
              btns: realbtns,
            },
          });
        } else if (typeof r.dropdown !== 'undefined') {
          let opts = getTexts(r.dropdown, lang, request.intentResult.contexts);
          if (r.dropdown.foreach) {
            const d = opts[0];
            const foreach = r.dropdown.foreach.split(' in ');
            const elem = foreach[0].trim().split(', ');
            opts = [];
            const newtext = reverseBracketsCurlyBraces(d.text);
            const newval = reverseBracketsCurlyBraces(d.value);
            await getProperty(
              request.intentResult.contexts,
              foreach[1].trim(),
            ).reduce(async (prev: any, e: any, key: any) => {
              await prev;
              const obj: any = {};
              if (elem.length > 1) {
                obj[elem[0].trim()] = key;
                obj[elem[1].trim()] = e;
              } else {
                obj[elem[0].trim()] = e;
              }
              const tpl1 = twig.twig({
                data: newtext,
              });
              const txt = await tpl1.renderAsync(obj);
              const tpl2 = twig.twig({
                data: newval,
              });
              const val = await tpl2.renderAsync(obj);
              opts.push({
                followupintent: d.followupintent,
                text: changeBrackets(txt),
                value: changeBrackets(val),
              });
            }, Promise.resolve());
          }
          const realopts: any[] = [];
          await opts.reduce(async (prev: any, b: any) => {
            await prev;
            realopts.push({
              text: await getTextFormated(
                b.text,
                request.intentResult.contexts,
              ),
              value: b.value,
              followupintent: b.followupintent,
            });
          }, Promise.resolve());
          newres.responses.push({
            dropdown: {
              opts: realopts,
            },
          });
        }
      } else if (r[Object.keys(r)[0]].alt) {
        const texts = getTexts(
          r[Object.keys(r)[0]].alt,
          lang,
          request.intentResult.contexts,
        );
        const text = texts[Math.floor(Math.random() * texts.length)];
        const realtxt = await getTextFormated(
          text,
          request.intentResult.contexts,
        );
        newres.responses.push({
          text: realtxt,
        });
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
  let newtext = text;
  if (text.indexOf('::foreach') !== -1) {
    const foreach = text.substring(text.indexOf('::foreach') + 9, text.length);
    newtext = `{% for ${foreach} %}${text.substring(
      0,
      text.indexOf('::foreach'),
    )}{% endfor %}`;
    newtext = changeBrackets(newtext);
  }
  const template: Template = twig.twig({
    data: newtext,
  });
  return await template.renderAsync({
    site: params.site,
    user: params.user,
    other: params.other,
  });
}

function getTexts(texts: any, lang: string, contexts: Contexts) {
  let res;
  if (texts[lang]) {
    res = texts[lang];
  } else if (texts[`${lang}-cond`]) {
    res = texts[`${lang}-cond`];
  } else if (texts.fr) {
    res = texts.fr;
  } else {
    res = texts['fr-cond'];
  }
  // First branch
  if (!(res instanceof Array)) {
    const cond = res.cond;
    if (res.masc || res['masc-cond']) {
      // Masc / Fem
      const prop = getProperty(contexts, cond);
      if (prop === 1) {
        // Fem
        res = res.fem;
      } else {
        // Masc
        res = res.masc;
      }
    } else {
      // Sing / Plur
      const prop = getProperty(contexts, cond);
      if (prop > 1) {
        // Use Plur
        if (res.plur) {
          res = res.plur;
        } else {
          res = res['plur-cond'];
        }
      } else {
        // Use Sing
        if (res.sing) {
          res = res.sing;
        } else {
          res = res['sing-cond'];
        }
      }
    }
  }
  // Second branch
  if (!(res instanceof Array)) {
    const cond = res.cond;
    if (res.masc) {
      // Masc / Fem
      const prop = getProperty(contexts, cond);
      if (prop === 1) {
        // Fem
        res = res.fem;
      } else {
        // Masc
        res = res.masc;
      }
    } else {
      // Sing / Plur
      const prop = getProperty(contexts, cond);
      if (prop > 1) {
        // Use Plur
        res = res.plur;
      } else {
        // Use Sing
        res = res.sing;
      }
    }
  }
  return res;
}

function getProperty(obj: any, attr: string): any {
  const tab = attr.split('.');
  if (tab.length > 1) {
    const a = tab.shift();
    if (a) {
      return getProperty(obj[a], tab.join('.'));
    }
  }
  return obj[attr];
}

function changeBrackets(text: string) {
  let newtext = text;
  let a = newtext.indexOf('[[');
  while (a >= 0) {
    newtext = `${newtext.substring(0, a)}{{${newtext.substring(
      a + 2,
      newtext.length,
    )}`;
    a = newtext.indexOf('[[', a + 2);
  }
  a = newtext.indexOf(']]');
  while (a >= 0) {
    newtext = `${newtext.substring(0, a)}}}${newtext.substring(
      a + 2,
      newtext.length,
    )}`;
    a = newtext.indexOf(']]', a + 2);
  }
  return newtext;
}

function reverseBracketsCurlyBraces(text: string) {
  let newtext = text;
  let a = newtext.indexOf('{{');
  let b = newtext.indexOf('[[');
  while (a >= 0 || b >= 0) {
    if (a >= 0) {
      newtext = `${newtext.substring(0, a)}||${newtext.substring(
        a + 2,
        newtext.length,
      )}`;
      a = newtext.indexOf('{{', a + 2);
    }
    if (b >= 0) {
      newtext = `${newtext.substring(0, b)}~~${newtext.substring(
        b + 2,
        newtext.length,
      )}`;
      b = newtext.indexOf('[[', b + 2);
    }
  }
  newtext = newtext.replace(/\|\|/g, '[[');
  newtext = newtext.replace(/\~\~/g, '{{');
  a = newtext.indexOf('}}');
  b = newtext.indexOf(']]');
  while (a >= 0 || b >= 0) {
    if (a >= 0) {
      newtext = `${newtext.substring(0, a)}||${newtext.substring(
        a + 2,
        newtext.length,
      )}`;
      a = newtext.indexOf('}}', a + 2);
    }
    if (b >= 0) {
      newtext = `${newtext.substring(0, b)}~~${newtext.substring(
        b + 2,
        newtext.length,
      )}`;
      b = newtext.indexOf(']]', b + 2);
    }
  }
  newtext = newtext.replace(/\|\|/g, ']]');
  newtext = newtext.replace(/\~\~/g, '}}');
  return newtext;
}
