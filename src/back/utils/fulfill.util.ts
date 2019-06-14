import {
  Intent,
  FulfillRequest,
  FulfillResult,
  IntentResult,
  ParseResponseRequest,
  ParsedResponse,
  Contexts,
  AnalyticsData,
  UnparsedText,
  UnparsedBtnOrOpt,
} from '../../types/types.util';
import config from '../config';

import intentRegister from './fulfill/register.intent';
import intentDefault from './fulfill/default.intent';
import intentInfos from './fulfill/infos.intent';
import intentRequest from './fulfill/request.intent';
import intentTests from './fulfill/tests.intent';

import analyticsmanager from './analytics.util';

import { clone } from './func.util';
import twig, { Template } from 'twig';
import { sendMessage } from './message.util';

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
            beautyname: '',
            desc: '',
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

  // Save analytics data
  const analytics: AnalyticsData = {
    request,
    archived: false,
    date: new Date().getTime(),
    parsedResponse: response,
    result: intentResult,
    results: intentsRes
      .sort((a: IntentResult, b: IntentResult) => {
        return a.confidence - b.confidence;
      })
      .slice(0, 3),
  };
  const id = await analyticsmanager.addEntry(analytics);

  // Send a mail if it's fallback
  if (
    intentResult.response.intent === 'default.fallback' &&
    config.FALLBACK_MAIL
  ) {
    await sendMessage({
      from: config.FALLBACK_MAIL,
      to: config.FALLBACK_MAIL,
      subject: "Lifee n'a pas compris !!!!",
      html:
        '<html>' +
        '<head>' +
        ' <style type="text/css">' +
        '   p {' +
        '     text-align: justify;' +
        '     font-family:Calibri, sans-serif;' +
        '   }' +
        ' </style>' +
        '</head>' +
        '<body>' +
        ` <p>Hello,</p><br />` +
        " <p>J'ai eu un petit problème, j'ai pas compris ce que me demandais un utilisateur</p><br/>" +
        ` <p>L'utilisateur avait écrit : ${request.result.query}.</p><br/>` +
        ` <p>Si tu veux plus d'informations, rends toi sur mon app de config, je t'ai laissé un log avec l'id : ${id}.</p><br/>` +
        ' <p>Lifee</p>' +
        '</body>' +
        '</html>',
    });
  }

  return result;
}

/**
 * Get the match between intents name and function to call
 */
function getConfig(): Intent[] {
  return [
    {
      // Tested
      name: config.INTENTS.register.default,
      func: intentRegister.register,
    },
    {
      // Tested
      name: config.INTENTS.register.mail,
      func: intentRegister.registerMail,
    },
    {
      // Tested
      name: config.INTENTS.register.name,
      func: intentRegister.registerName,
    },
    {
      name: config.INTENTS.register.code,
      func: intentRegister.registerCode,
    },
    {
      // Tested
      name: config.INTENTS.infos.openingtime,
      func: intentInfos.opentime,
    },
    {
      // Tested
      name: config.INTENTS.infos.contact,
      func: intentInfos.contact,
    },
    {
      // Tested
      name: config.INTENTS.infos.services,
      func: intentInfos.services,
    },
    {
      // Tested
      name: config.INTENTS.infos.relaiscolis,
      func: intentInfos.relaiscolis,
    },
    {
      // Tested
      name: config.INTENTS.infos.infos,
      func: intentInfos.infos,
    },
    {
      name: config.INTENTS.infos.compopanier,
      func: intentInfos.compopanier,
    },
    {
      // Tested
      name: config.INTENTS.request.global,
      func: intentRequest.global,
    },
    /*
    {
      name: config.INTENTS.request.update,
      func: intentRequest.details,
    },
    */
    {
      // Tested
      name: config.INTENTS.default.fallback,
      func: intentDefault.fallback,
    },
    {
      name: config.INTENTS.default.welcome,
      func: intentDefault.welcome,
    },
    {
      name: 'infos-listgroup',
      func: intentTests.listgroup,
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
          const text = await getTheText(
            r.text,
            lang,
            request.intentResult.contexts,
          );
          if (text) {
            newres.responses.push({
              text,
            });
          }
        } else if (typeof r.media !== 'undefined') {
          newres.responses.push({
            media: r.media.value,
          });
        } else if (typeof r.link !== 'undefined') {
          newres.responses.push({
            link: r.link.value,
          });
        } else if (typeof r.btn !== 'undefined') {
          let btns = [];
          if (r.btn.group) {
            await r.btn.group.reduce(async (prev: any, btn: any) => {
              await prev;
              const text = await getTheText(
                btn.text,
                lang,
                request.intentResult.contexts,
              );
              if (text) {
                btns.push({
                  text,
                  value: btn.value,
                  followupintent: btn.followupintent,
                });
              }
            }, Promise.resolve());
          } else if (r.btn.list) {
            btns = await formatBtnDDList(
              r.btn.list[0],
              lang,
              request.intentResult.contexts,
            );
          }
          if (btns && btns.length > 0) {
            newres.responses.push({
              btn: {
                btns,
              },
            });
          }
        } else if (typeof r.dropdown !== 'undefined') {
          let opts = [];
          if (r.dropdown.options) {
            await r.dropdown.options.reduce(async (prev: any, btn: any) => {
              await prev;
              const text = await getTheText(
                btn.text,
                lang,
                request.intentResult.contexts,
              );
              if (text) {
                opts.push({
                  text,
                  value: btn.value,
                  followupintent: btn.followupintent,
                });
              }
            }, Promise.resolve());
          } else if (r.dropdown.list) {
            opts = await formatBtnDDList(
              r.dropdown.list[0],
              lang,
              request.intentResult.contexts,
            );
          }
          if (opts && opts.length > 0) {
            newres.responses.push({
              dropdown: {
                opts,
              },
            });
          }
        }
      } else if (r[Object.keys(r)[0]].alt) {
        const text = await getTheText(
          r[Object.keys(r)[0]].alt,
          lang,
          request.intentResult.contexts,
        );
        if (text) {
          newres.responses.push({
            text,
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
  const template: Template = twig.twig({
    data: text,
  });
  return await template.renderAsync({
    site: params.site,
    user: params.user,
    other: params.other,
  });
}

function evalCond(cond: string, contexts: any) {
  let thecond = cond.trim();
  if (thecond.indexOf('{{') === -1 || !thecond.endsWith('}}')) return false;
  thecond = thecond.substring(thecond.indexOf('{{'));
  const cont = thecond
    .substring(2, thecond.length - 2)
    .trim()
    .split('.');
  let obj = contexts;
  cont.forEach(e => {
    obj = obj[e];
  });
  if (obj instanceof Array) {
    return obj.length > 1;
  }
  if (cond.indexOf('not ') !== -1) {
    return obj === 0;
  }
  return obj === 1;
}

function getFromLang(text: any, lang: string) {
  let texts: string[] | null = null;
  if (text.fr) {
    texts = text.fr;
  }
  if (text[lang]) {
    texts = text[lang];
  }
  if (!texts) return null;
  return texts[Math.floor(Math.random() * texts.length)];
}

function formatGenPlur(text: string, obj: any, contexts: any) {
  if (obj.genplur) {
    let plural = false;
    let gender = false;
    if (obj.genplur.plural) {
      plural = evalCond(obj.genplur.plural, contexts);
    }
    if (obj.genplur.gender) {
      gender = evalCond(obj.genplur.gender, contexts);
    }
    let txt = text;
    let a = txt.indexOf('(.');
    let b = txt.indexOf(')', a);
    while (a !== -1 && b !== -1) {
      const sp = txt.substring(0, a).split(' ');
      const def = sp[sp.length - 1];
      const vars = [
        {
          vari: def,
          pos: a - def.length,
          type: 'mascsing',
        },
      ];
      const thevar = {
        vari: txt.substring(a + 1, b),
        pos: a,
        type: '',
      };
      thevar.type = thevar.vari.startsWith('...')
        ? 'femplur'
        : thevar.vari.startsWith('..')
        ? 'mascplur'
        : 'femsing';
      thevar.vari = thevar.vari.replace(/\./, '');
      vars.push(thevar);
      let lastpos = b + 1;
      while (a !== -1 && b !== -1 && txt[b + 1] === '(' && txt[b + 2] === '.') {
        a = txt.indexOf('(.', b);
        b = txt.indexOf(')', a);
        if (b !== -1) {
          const myvar = { vari: txt.substring(a + 1, b), pos: a, type: '' };
          myvar.type = myvar.vari.startsWith('...')
            ? 'femplur'
            : myvar.vari.startsWith('..')
            ? 'mascplur'
            : 'femsing';
          vars.push(myvar);
          lastpos = b + 1;
        }
      }
      let word = null;
      if (!plural && !gender) {
        word = vars.filter(v => v.type === 'mascsing')[0];
      } else if (!plural && gender) {
        if (vars.filter(v => v.type === 'femsing').length > 0)
          word = vars.filter(v => v.type === 'femsing')[0];
        else word = vars.filter(v => v.type === 'mascsing')[0];
      } else if (plural && !gender) {
        if (vars.filter(v => v.type === 'mascplur').length > 0)
          word = vars.filter(v => v.type === 'mascplur')[0];
        else word = vars.filter(v => v.type === 'mascsing')[0];
      } else {
        if (vars.filter(v => v.type === 'femplur').length > 0)
          word = vars.filter(v => v.type === 'femplur')[0];
        else if (vars.filter(v => v.type === 'mascplur').length > 0)
          word = vars.filter(v => v.type === 'mascplur')[0];
        else word = vars.filter(v => v.type === 'mascsing')[0];
      }
      const first = vars.filter(v => v.type === 'mascsing')[0].pos;
      txt = `${txt.substring(0, first)}${word.vari}${txt.substring(lastpos)}`;

      a = txt.indexOf('(.');
      b = txt.indexOf(')', a);
    }
    return txt;
  }
  return text;
}

function getTheText(text: any, lang: string, contexts: any) {
  if (!text.cond || evalCond(text.cond, contexts)) {
    let thetext = null;
    if (text.list) {
      const txt = getFromLang(text.list, lang);
      if (!txt) return null;
      const a = txt.indexOf('{{');
      const b = txt.indexOf('}}', a);
      if (a !== -1 && b !== -1) {
        const vari = txt.substring(a + 2, b).trim();
        const objs = vari.split('.');
        let obj = contexts[objs[0]];
        for (let i = 1; i < objs.length - 1; i += 1) {
          if (!obj) break;
          obj = obj[objs[i]];
        }
        let realtxt = '';
        if (obj && obj instanceof Array) {
          obj.forEach((elem: any) => {
            const mytxt = insertDataInString(txt, elem);
            realtxt += `${mytxt}\n`;
          });
        }
        thetext = realtxt;
      } else {
        thetext = txt;
      }
    } else {
      const t = getFromLang(text, lang);
      if (!t) return null;
      thetext = t;
    }
    if (!thetext) return null;
    return getTextFormated(formatGenPlur(thetext, text, contexts), contexts);
  }
  return null;
}

function insertDataInString(txt: string, obj: any) {
  let mytxt = txt;
  let c = txt.indexOf('{{');
  let d = txt.indexOf('}}', c);
  while (c !== -1 && d !== -1) {
    const thevar = mytxt
      .substring(c + 2, d)
      .trim()
      .split('.');
    mytxt = `${mytxt.substring(0, c)}${
      obj[thevar[thevar.length - 1]]
    }${mytxt.substring(d + 2)}`;
    c = mytxt.indexOf('{{');
    d = mytxt.indexOf('}}', c);
  }
  return mytxt;
}

async function formatBtnDDList(
  list: UnparsedBtnOrOpt,
  lang: string,
  contexts: any,
) {
  let txt = getFromLang(list.text, lang);
  if (!txt) return [];
  txt = formatGenPlur(txt, list.text, contexts);
  let a = txt.indexOf('{{');
  let b = txt.indexOf('}}');
  let thevar = null;
  if (a === -1 || b === -1) {
    a = list.value.indexOf('{{');
    b = list.value.indexOf('}}');
    if (a === -1 || b === -1) {
      a = list.followupintent.indexOf('{{');
      b = list.followupintent.indexOf('}}');
      if (a === -1 || b === -1) {
        return [
          {
            text: txt,
            value: list.value,
            followupintent: list.followupintent,
          },
        ];
      }
      thevar = list.followupintent
        .substring(a + 2, b)
        .trim()
        .split('.');
    } else {
      thevar = list.value
        .substring(a + 2, b)
        .trim()
        .split('.');
    }
  } else {
    thevar = txt
      .substring(a + 2, b)
      .trim()
      .split('.');
  }
  let obj = contexts;
  for (let i = 0; i < thevar.length - 1; i += 1) {
    obj = obj[thevar[i]];
  }
  if (!obj) return [];
  if (!(obj instanceof Array)) return [];
  const res: any[] = [];
  await obj.reduce(async (previous: any, e: any) => {
    await previous;
    const text = insertDataInString(txt ? txt : '', e);
    const value = insertDataInString(list.value, e);
    const followupintent = insertDataInString(list.followupintent, e);
    res.push({
      text,
      value,
      followupintent,
    });
  }, Promise.resolve());
  return res;
}
