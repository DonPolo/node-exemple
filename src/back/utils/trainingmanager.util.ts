import { execrequest } from './async.util';
import config from '../config';

/**
 * Get all the intents name in SAP recast
 * @returns a list of intents name : string[]
 */
async function getIntents(): Promise<string[]> {
  let res = await execrequest({
    url: `https://api.cai.tools.sap/train/v2/users/${
      config.SAP.userslug
    }/bots/${config.SAP.botslug}/versions/${
      config.SAP.versionslug
    }/dataset/intents`,
    method: 'GET',
    headers: {
      Authorization: `Token ${config.SAP.devtoken}`,
    },
  });
  res = JSON.parse(res.body);
  const intents: string[] = [];
  res.results.forEach((r: any) => {
    intents.push(r.name);
  });
  return intents;
}

/**
 * Get the different intent types which are formed like 'type-intent'
 * @returns a list of types name : string []
 */
async function getTypes(): Promise<string[]> {
  const intents = await getIntents();
  const types: string[] = [];
  intents.forEach((i: string) => {
    types.push(i.split('-')[0]);
  });
  return types;
}

/**
 * Get all the intents name for one type without the type like 'type-intentname'
 * @param type name of a type : string
 * @returns a list of intents name : string[]
 */
async function loadtype(type: string): Promise<string[]> {
  const intents = await getIntents();
  const files: any[] = [];
  intents.forEach((i: string) => {
    if (i.split('-')[0] === type) {
      files.push({
        type,
        name: i.split('-')[1],
      });
    }
  });
  return files;
}

/**
 * Get the expressions for one intent
 * @param file the intent name with the type like 'type-intent'
 * @returns a list of expressions see SAP doc to have the structure : any[]
 */
async function loadexpressions(file: string): Promise<any[]> {
  let res = await execrequest({
    url: `https://api.cai.tools.sap/train/v2/users/${
      config.SAP.userslug
    }/bots/${config.SAP.botslug}/versions/${
      config.SAP.versionslug
    }/dataset/intents/${file}/expressions`,
    method: 'GET',
    headers: {
      Authorization: `Token ${config.SAP.devtoken}`,
    },
  });
  res = JSON.parse(res.body);
  return res.results;
}

/**
 * Get a json which represent the training sentences of an intent
 * @param file the intent name with the type like 'type-intent'
 * @returns a list of sentences : string[]
 */
async function loadfile(file: string): Promise<string[]> {
  const res = await loadexpressions(file);
  const expressions: any[] = [];
  await res.reduce(async (previous: any, e: any) => {
    await previous;
    let r = await execrequest({
      url: `https://api.cai.tools.sap/train/v2/users/${
        config.SAP.userslug
      }/bots/${config.SAP.botslug}/versions/${
        config.SAP.versionslug
      }/dataset/intents/${file}/expressions/${e.id}`,
      method: 'GET',
      headers: {
        Authorization: `Token ${config.SAP.devtoken}`,
      },
    });
    r = JSON.parse(r.body);
    expressions.push(r.results);
  }, Promise.resolve());
  const final: any = [];
  expressions.forEach((e: any) => {
    let sentence = e.source;
    let a = 0;
    e.tokens.forEach((t: any) => {
      if (t.entity !== null) {
        a = sentence.indexOf(t.word.name, a);
        if (a !== -1) {
          const rep = `{{ ${t.word.name} | ${t.entity.slug} }}`;
          sentence = `${sentence.substring(0, a)}${rep}${sentence.substring(
            a + t.word.name.length,
          )}`;
          a += rep.length;
        }
      }
    });
    final.push(sentence);
  });
  return final;
}

async function updatefile(file: string, news: string[], todelete: string[]) {
  // Delete all expressions
  const resdel = await loadexpressions(file);
  const realdelete: string[] = [];
  todelete.forEach((e: string) => {
    let src = e;
    while (src.indexOf('{{') !== -1) {
      const a = src.indexOf('{{') + 2;
      const b = src.indexOf('}}');
      const txt = src.substring(a, b);
      const type = txt.split('|')[1].trim();
      const val = txt.split('|')[0].trim();
      src = src.substring(0, a - 2) + val + src.substring(b + 2, src.length);
    }
    realdelete.push(src);
  });
  await resdel.reduce(async (previous: any, e: any) => {
    await previous;
    if (realdelete.includes(e.source)) {
      await execrequest({
        url: `https://api.cai.tools.sap/train/v2/users/${
          config.SAP.userslug
        }/bots/${config.SAP.botslug}/versions/${
          config.SAP.versionslug
        }/dataset/intents/${file}/expressions/${e.id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Token ${config.SAP.devtoken}`,
        },
      });
    }
  }, Promise.resolve());
  // Get entities
  let entities = await execrequest({
    url: `https://api.cai.tools.sap/train/v2/users/${
      config.SAP.userslug
    }/bots/${config.SAP.botslug}/versions/${
      config.SAP.versionslug
    }/dataset/entities`,
    method: 'GET',
    headers: {
      Authorization: `Token ${config.SAP.devtoken}`,
    },
  });
  entities = JSON.parse(entities.body).results;
  // Create new expressions
  await news.reduce(async (previous: any, e: string) => {
    await previous;
    let src = e;
    const ents: any[] = [];
    while (src.indexOf('{{') !== -1) {
      const a = src.indexOf('{{') + 2;
      const b = src.indexOf('}}');
      const txt = src.substring(a, b);
      const type = txt.split('|')[1].trim();
      const val = txt.split('|')[0].trim();
      src = src.substring(0, a - 2) + val + src.substring(b + 2, src.length);
      const ent = entities.filter((en: any) => en.slug === type)[0];
      ents.push({
        val,
        entity: ent,
      });
    }
    const expr = {
      source: src,
      tokens: null,
      language: {
        isocode: 'fr',
      },
    };
    const res = await execrequest({
      url: `https://api.cai.tools.sap/train/v2/users/${
        config.SAP.userslug
      }/bots/${config.SAP.botslug}/versions/${
        config.SAP.versionslug
      }/dataset/intents/${file}/expressions`,
      method: 'POST',
      headers: {
        Authorization: `Token ${config.SAP.devtoken}`,
        'Content-Type': 'application/json',
      },
      json: expr,
    });
    if (ents.length > 0) {
      const id = res.body.results.id;
      const tokens = res.body.results.tokens;
      let j = -1;
      ents.forEach((en: any) => {
        let i = 0;
        for (const token of tokens) {
          if (i > j && token.word.name === en.val) {
            j = i;
            token.entity = en.entity;
          }
          i += 1;
        }
      });
      const re = await execrequest({
        url: `https://api.cai.tools.sap/train/v2/users/${
          config.SAP.userslug
        }/bots/${config.SAP.botslug}/versions/${
          config.SAP.versionslug
        }/dataset/intents/${file}/expressions/${id}`,
        method: 'PUT',
        headers: {
          Authorization: `Token ${config.SAP.devtoken}`,
          'Content-Type': 'application/json',
        },
        json: { tokens, source: res.body.results.source },
      });
    }
  }, Promise.resolve());
}

async function getEntities() {
  let res = await execrequest({
    url: `https://api.cai.tools.sap/train/v2/users/${
      config.SAP.userslug
    }/bots/${config.SAP.botslug}/versions/${
      config.SAP.versionslug
    }/dataset/entities`,
    method: 'GET',
    headers: {
      Authorization: `Token ${config.SAP.devtoken}`,
    },
  });
  res = JSON.parse(res.body);
  const entities: string[] = [];
  res.results.forEach((e: any) => {
    entities.push(e.slug);
  });
  return entities;
}

export default {
  getIntents,
  getTypes,
  loadtype,
  loadfile,
  updatefile,
  getEntities,
};