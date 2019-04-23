import Datastore from 'nedb';
import { Contexts } from './types.util';

const db = new Datastore({ filename: 'DB/responses', autoload: true });

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

const update: any = async (query: any) => {
  return new Promise((resolve, reject) => {
    db.update(
      { user: query.user },
      { $set: { contexts: query.contexts } },
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

async function save(user: string, c: Contexts) {
  if (user) {
    const nb = await findone({ user });
    const contexts = {
      fulfill: c.fulfill,
      service: c.service,
    };
    if (!nb) {
      // Inserting context
      await insert({ user, contexts, createTime: Date.now() });
    } else {
      // Updating context
      await update({ user, contexts });
    }
  }
}

async function load(intent: string): Promise<any> {
  let response = await findone({ intent });
  if (!response) {
    response = await findone({ intent: 'fallback' });
  }
  return response;
}

export default {
  save,
  load,
};
