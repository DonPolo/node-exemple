import Datastore from 'nedb';
import { AnalyticsData } from './types.util';

// Connect to a DB stored in DB/analytics
const db = new Datastore({ filename: 'DB/analytics', autoload: true });

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
        resolve(doc);
      }
    });
  });
};

/**
 * Find datas in the database with promise
 * @param query a NoSQL query like with MongoDB
 */
const find: any = async (page: number) => {
  return new Promise((resolve, reject) => {
    db.find({})
      .sort({ date: -1 })
      .skip((page - 1) * 20)
      .limit(20)
      .exec((err: any, docs: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(docs);
        }
      });
  });
};

async function addEntry(doc: AnalyticsData) {
  await insert(doc);
}

async function getAll(page: number): Promise<AnalyticsData[]> {
  const res = await find(page);
  return res;
}

export default {
  addEntry,
  getAll,
};
