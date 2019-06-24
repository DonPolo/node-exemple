import Datastore from 'nedb';
import { Response } from '../../types/types.util';
import yaml from 'yamljs';
import json2pyaml from 'json-to-pretty-yaml';
import dbmanagerUtil from './dbmanager.util';

// Connect to a DB stored in DB/responses
const db = dbmanagerUtil.getResponse();

const remove: any = async (query: any) => {
  return new Promise((resolve, reject) => {
    db.remove(query, (err, numRemoved) => {
      if (err) {
        reject(err);
      } else {
        resolve(numRemoved);
      }
    });
  });
};

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
        const newdoc = yaml.parse(doc.data);
        newdoc.yaml = doc.data;
        resolve(newdoc);
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
        const res: any[] = [];
        docs.forEach((doc: any) => {
          const newdoc = yaml.parse(doc.data);
          newdoc.yaml = doc.data;
          res.push(newdoc);
        });
        resolve(res);
      }
    });
  });
};

/**
 * Save an intent response in the DB, the intent must already exists
 * @param response the response object
 */
async function save(response: string, infos: any) {
  await update({ intent: infos.intent, all: { data: response } });
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

async function getAll(): Promise<any> {
  return await find({});
}

/**
 * Load an intent response and return the object
 * @param intent intent name with the type like 'type.intent'
 */
async function loadFile(intent: string): Promise<any> {
  let response = await findone({ intent });
  if (!response) {
    response = await findone({ intent: 'default.fallback' });
  }
  return response.data;
}

async function addResponse(obj: any) {
  const yamlinf = obj;
  const intent = obj.intent;
  delete yamlinf.intent;
  const realdoc = {
    intent,
    data: json2pyaml.stringify(yamlinf),
  };
  await insert(realdoc);
  return await loadFile(intent);
}

async function removeFile(file: string) {
  await remove({ intent: file });
}

async function modifFile(file: string, newtype: string, newname: string) {
  await update({
    intent: file,
    all: { $set: { intent: newname } },
  });
}

export default {
  save,
  load,
  getAll,
  loadFile,
  addResponse,
  modifFile,
  delete: removeFile,
};
