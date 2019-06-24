import { AnalyticsData } from '../../types/types.util';
import dbmanagerUtil from './dbmanager.util';

// Connect to a DB stored in DB/analytics
const db = dbmanagerUtil.getAnalytics();

const count = async (query: any): Promise<number> => {
  return new Promise((resolve, reject) => {
    db.count(query, (err, nb) => {
      if (err) {
        reject(err);
      } else {
        resolve(nb);
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

const archive: any = async (query: any) => {
  return new Promise((resolve, reject) => {
    db.update(
      query,
      { $set: { archived: true } },
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

const recovery: any = async (query: any) => {
  return new Promise((resolve, reject) => {
    db.update(
      query,
      { $set: { archived: false } },
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
 * Find datas in the database with promise
 * @param query a NoSQL query like with MongoDB
 */
const find: any = async (query: any) => {
  return new Promise((resolve, reject) => {
    db.find(query)
      .sort({ date: -1 })
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
  const res = await insert(doc);
  return res._id;
}

async function getAll(): Promise<AnalyticsData[]> {
  const query = {};
  const res = await find(query);
  return res;
}

async function getNb(isarchived: boolean): Promise<number> {
  let query = {};
  if (isarchived) {
    query = {};
  } else {
    query = { archived: false };
  }
  return await count(query);
}

async function archived(id: string) {
  await archive({ _id: id });
}

async function recover(id: string) {
  await recovery({ _id: id });
}

export default {
  addEntry,
  getAll,
  getNb,
  archived,
  recover,
};
