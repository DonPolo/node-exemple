// @flow
import type { Nedb } from 'nedb';

import Dialogflow, { indexes as dialogflowIndexes } from './dialogflow.models';
import Engie, { indexes as engieIndexes } from './engie.models';

const insert = (db: Nedb, doc: Object) =>
  new Promise((resolve, reject) => {
    db.insert(doc, (err, res: Object) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });

const update = (db: Nedb, query: Object, updateQuery: Object, opt: Object) =>
  new Promise((resolve, reject) => {
    db.update(
      query,
      updateQuery,
      opt,
      (err, numberOfUpdated: number, upsert: boolean) => {
        if (err) {
          reject(err);
        } else {
          resolve({ numberOfUpdated, upsert });
        }
      }
    );
  });

const find = (db: Nedb, opt: Object) =>
  new Promise((resolve, reject) => {
    db.find(opt, (err, res: Object[]) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });

const findOne = (db: Nedb, opt: Object) =>
  new Promise((resolve, reject) => {
    db.findOne(opt, (err, res: ?Object) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });

const count = (db: Nedb, opt: Object) =>
  new Promise((resolve, reject) => {
    db.count(opt, (err, res: number) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });

const ensureIndex = (db: Nedb, opt: Object) =>
  new Promise((resolve, reject) => {
    db.ensureIndex(opt, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });

export const ensureIndexes = () => {
  // Ensure all indexes
  dialogflowIndexes.reduce(async (previous, index) => {
    await previous;
    await ensureIndex(Dialogflow, index);
  }, Promise.resolve());
  engieIndexes.reduce(async (previous, index) => {
    await previous;
    await ensureIndex(Engie, index);
  }, Promise.resolve());
};

export default {
  model: {
    Dialogflow,
    Engie
  },
  insert,
  update,
  find,
  findOne,
  count,
  ensureIndex
};
