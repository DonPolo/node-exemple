import Datastore from 'nedb';
import { Contexts } from './types.util';
import config from '../config';

const db = new Datastore({ filename: 'DB/contexts', autoload: true });

async function deleteOld() {
  const ttl = Date.now() - config.NEDB.ttl * 86400000;
  await db.remove({ createTime: { $lt: ttl } }, { multi: true });
}

const count: any = async (query: any) => {
  return new Promise((resolve, reject) => {
    db.count(query, (err: any, nb: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(nb);
      }
    });
  });
};

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
  await deleteOld();
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

async function load(user: string): Promise<Contexts> {
  await deleteOld();
  const contexts = await findone({ user });
  if (contexts) {
    contexts.contexts.site = null;
    return contexts.contexts;
  }
  return {
    fulfill: null,
    service: {
      watson: null,
    },
    site: null,
  };
}

export default {
  save,
  load,
};
