import express, { response } from 'express';
import responsemanager from '../utils/responsemanager.util';
import trainingmanager from '../utils/trainingmanager.util';

import json2pyaml from 'json-to-pretty-yaml';
import yaml from 'yamljs';

/**
 * Show the different response and training types
 * @param req
 * @param res
 * @param next
 */
async function home(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const restypes = await responsemanager.gettypes();
  const traintypes = await trainingmanager.getTypes();
  const types = restypes;
  traintypes.forEach((t: any) => {
    if (!types.includes(t)) {
      types.push(t);
    }
  });
  const result: {
    response: any[];
    training: any[];
  } = {
    response: [],
    training: [],
  };
  await types.reduce(async (previous: any, e: any) => {
    await previous;
    const responsefiles = await responsemanager.loadtype(e);
    const trainfiles = await trainingmanager.loadtype(e);
    result.response.push({
      files: responsefiles,
      type: e,
    });
    result.training.push({
      files: trainfiles,
      type: e,
    });
  }, Promise.resolve());
  res.render('home.twig', { files: result });
}

/**
 * Show an editor to edit the file
 * @param req
 * @param res
 * @param next
 */
async function file(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const typeparam = req.params.type;
  const catparam = req.params.cat;
  const nameparam = req.params.name;
  let fileres: any;
  let params: string[] = [];
  if (catparam === 'response') {
    fileres = await responsemanager.loadfile(`${typeparam}.${nameparam}`);
    params = [
      'user.lastname',
      'user.firstname',
      'user.email',
      'user.siteGroup',
      'user.userId',
      'site.id',
      'site.code',
      'site.libelle',
      'site.email',
      'site.telephone',
      'site.botNumber',
      'site.horaires',
      'site.infos',
      'site.guideServices',
      'site.relaisColis',
      'site.concierges.prenomsconcierges',
      'site.concierges.nb',
      'site.concierges.genre',
    ];
  } else if (catparam === 'training') {
    fileres = await trainingmanager.loadfile(`${typeparam}-${nameparam}`);
  }
  res.render('file.twig', {
    params,
    paramsstr: JSON.stringify(params),
    file: json2pyaml.stringify(fileres),
    type: typeparam,
    filename: nameparam,
    cat: catparam,
  });
}

/**
 * Save the file
 * @param req
 * @param res
 * @param next
 */
async function save(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  let error = null;
  try {
    const json = yaml.parse(req.body.code);
    if (req.body.cat === 'response') {
      await responsemanager.save(json);
    } else if (req.body.cat === 'training') {
      const oldjson = yaml.parse(req.body.oldcode);
      let todelete: string[] = [];
      const news: string[] = [];
      if (json instanceof Array && oldjson instanceof Array) {
        todelete = oldjson;
        json.forEach(j => {
          let already = false;
          oldjson.forEach(o => {
            if (j === o) {
              already = true;
              todelete.splice(todelete.indexOf(o), 1);
            }
          });
          if (!already) {
            news.push(j);
          }
        });
      }
      await trainingmanager.updatefile(
        req.body.file.replace('.', '-'),
        news,
        todelete,
      );
    }
  } catch (e) {
    error = e;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error }));
}

/**
 * Get all the types and there files
 * @param req
 * @param res
 * @param next
 */
async function getfiles(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    if (req.body.token === 'MmFJYmkWa1Qfg730c5gORJaEOTsBmXfw') {
      const restypes = await responsemanager.gettypes();
      const traintypes = await trainingmanager.getTypes();
      const types = restypes;
      traintypes.forEach((t: any) => {
        if (!types.includes(t)) {
          types.push(t);
        }
      });
      const result: {
        response: any[];
        training: any[];
      } = {
        response: [],
        training: [],
      };
      await types.reduce(async (previous: any, e: any) => {
        await previous;
        const responsefiles = await responsemanager.loadtype(e);
        const trainfiles = await trainingmanager.loadtype(e);
        result.response.push({
          files: responsefiles,
          type: e,
        });
        result.training.push({
          files: trainfiles,
          type: e,
        });
      }, Promise.resolve());
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
      return;
    }
  } catch (e) {
    // Do nothing
  }
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end();
}

async function getentities(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    const entities = await trainingmanager.getEntities();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(entities));
    return;
  } catch (e) {
    // Do nothing
  }
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end();
}

export default {
  home,
  file,
  save,
  getfiles,
  getentities,
};
