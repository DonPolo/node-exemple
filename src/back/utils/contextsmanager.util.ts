import Datastore from 'nedb';
import {
  Contexts,
  getEmptySiteContexts,
  getEmptyUserContexts,
} from './types.util';
import config from '../config';

// Connect to ad db stored in DB/contexts
const db = new Datastore({ filename: 'DB/contexts', autoload: true });

/**
 * Delete old contexts (date expired)
 */
async function deleteOld() {
  const ttl = Date.now() - config.NEDB.ttl * 86400000;
  await db.remove({ createTime: { $lt: ttl } }, { multi: true });
}

/**
 * Count the occurences in db
 * @param query a mongodb query
 */
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

/**
 * Insert datas in db
 * @param query a mongodb query
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
 * Update datas in db
 * @param query a mongodb query
 */
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

/**
 * Find one row in db
 * @param query a mongodb query
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
 * Save contexts relative to a user
 * @param user the user id (phone, mail)
 * @param c the contexts to store
 */
async function save(user: string, c: Contexts) {
  await deleteOld();
  if (user) {
    const nb = await findone({ user });
    const contexts = {
      fulfill: c.fulfill,
      service: c.service,
      user: c.user,
    };
    if (!nb) {
      // Inserting context
      contexts.user.userId = user;
      await insert({ user, contexts, createTime: Date.now() });
    } else {
      // Updating context
      await update({ user, contexts });
    }
  }
}

/**
 * Load a user contexts (if there's not return an empty context)
 * @param user the user id (phone, mail)
 */
async function load(user: string): Promise<Contexts> {
  await deleteOld();
  if (user) {
    const contexts = await findone({ user });
    if (contexts) {
      contexts.contexts.site = null;
      contexts.contexts.concierges = null;
      return contexts.contexts;
    }
  }
  return {
    fulfill: [],
    user: getEmptyUserContexts(),
    service: {
      watson: null,
    },
    site: getEmptySiteContexts(),
    other: null,
  };
}

export default {
  save,
  load,
};
