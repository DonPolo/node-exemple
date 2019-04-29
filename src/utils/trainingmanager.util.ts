import { execrequest } from './async.util';
import config from '../config';
import uuid from 'uuid';

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
  const files: string[] = [];
  intents.forEach((i: string) => {
    if (i.split('-')[0] === type) {
      files.push(i.split('-')[1]);
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
    e.tokens.forEach((t: any) => {
      if (t.entity !== null) {
        sentence = sentence
          .split(t.word.name)
          .join(`{{ ${t.word.name} | ${t.entity.slug} }}`);
      }
    });
    final.push(sentence);
  });
  return final;
}

async function updatefile(file: string, newfile: any) {
  // Delete all expressions
  /*const res = await loadexpressions(file);
  await res.results.reduce(async (previous: any, e: any) => {
    await previous;
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
  }, Promise.resolve());*/
  // Create new expressions
  const expressions: any[] = [];
  newfile.forEach((e: string) => {
    let src = e;
    const toks: any[] = [];
    while (src.indexOf('{{') !== -1) {
      const a = src.indexOf('{{') + 2;
      const b = src.indexOf('}}');
      const txt = src.substring(a, b);
      const type = txt.split('|')[1].trim();
      const val = txt.split('|')[0].trim();
      src = src.substring(0, a - 2) + val + src.substring(b + 2, src.length);
      toks.push({
        id: uuid(),
        space: false,
        word: {
          id: uuid(),
          name: val,
          slug: val,
        },
        entity: {
          id: uuid(),
          name: type.toUpperCase(),
          slug: type,
        },
      });
    }
    expressions.push({
      id: uuid(),
      source: src,
      tokens: toks,
      language: {
        id: '996ad860-2a9a-504f-8861-aeafd0b2ae29',
        name: 'French',
        slug: 'french',
        isocode: 'fr',
        support: 'advanced',
      },
    });
  });
  const res = await execrequest({
    url: `https://api.cai.tools.sap/train/v2/users/${
      config.SAP.userslug
    }/bots/${config.SAP.botslug}/versions/${
      config.SAP.versionslug
    }/dataset/intents/${file}/expressions/bulk_create`,
    method: 'POST',
    headers: {
      Authorization: `Token ${config.SAP.devtoken}`,
      'Content-Type': 'application/json',
    },
    json: {
      expressions,
    },
  });
}

export default {
  getIntents,
  getTypes,
  loadtype,
  loadfile,
  updatefile,
};
