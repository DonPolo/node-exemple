import Datastore from 'nedb';
import { Response } from './types.util';

// Connect to a DB stored in DB/responses
const db = new Datastore({ filename: 'DB/responses', autoload: true });

/**
 * Insert datas in the database with promise
 * @param query a NoSQL query like with MongoDB
 */
const insert: any = async (query: any) => {
  return new Promise((resolve, reject) => {
    db.insert(query, (err: any, newDoc: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(newDoc);
      }
    });
  });
};

/**
 * Update datas in the database with promise
 * @param query a NoSQL query like with MongoDB
 */
const update: any = async (query: any) => {
  return new Promise((resolve, reject) => {
    db.update(
      { intent: query.intent },
      query.all,
      {},
      (err: any, numReplaced: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(numReplaced);
        }
      },
    );
  });
};

/**
 * Find one row in the database with promise
 * @param query a NoSQL query like with MongoDB
 */
const findone: any = async (query: any) => {
  return new Promise((resolve, reject) => {
    db.findOne(query, (err: any, doc: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(doc);
      }
    });
  });
};

/**
 * Find datas in the database with promise
 * @param query a NoSQL query like with MongoDB
 */
const find: any = async (query: any) => {
  return new Promise((resolve, reject) => {
    db.find(query, (err: any, docs: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(docs);
      }
    });
  });
};

/**
 * Save an intent response in the DB, the intent must already exists
 * @param response the response object
 */
async function save(response: any) {
  await update({ intent: response.intent, all: response });
}

/**
 * Load an intent by it's name
 * @param intent the intent name with the type like 'type.intent'
 */
async function load(intent: string): Promise<Response> {
  let response = await findone({ intent });
  if (response && response.clone) {
    response = await load(response.clone);
  }
  if (!response) {
    response = await findone({ intent: 'default.fallback' });
  }
  return response;
}

/**
 * Get the different intents for a given type
 * @param type the intent type like 'type.intent'
 */
async function loadtype(type: string): Promise<any> {
  const files = await find({ type });
  if (files) {
    const realfiles: string[] = [];
    files.forEach((f: any) => {
      realfiles.push(f.intent.split('.')[1]);
    });
    return realfiles;
  }
  return [];
}

/**
 * Get the different types
 */
async function gettypes(): Promise<any> {
  const response = await find({});
  if (response) {
    const res: string[] = [];
    response.forEach((r: any) => {
      if (!res.includes(r.type)) {
        res.push(r.type);
      }
    });
    return res;
  }
  return [];
}

/**
 * Load an intent response and return the object
 * @param intent intent name with the type like 'type.intent'
 */
async function loadfile(intent: string): Promise<any> {
  let response = await findone({ intent });
  if (!response) {
    response = await findone({ intent: 'default.fallback' });
  }
  delete response._id;
  return response;
}

export default {
  save,
  load,
  loadtype,
  gettypes,
  loadfile,
};
