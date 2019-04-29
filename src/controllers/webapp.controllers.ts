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
  res.render('home.twig', { types });
}

/**
 * Show the different responses and trainings for one type
 * @param req
 * @param res
 * @param next
 */
async function type(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const typeparam = req.params.type;
  const responsefiles = await responsemanager.loadtype(typeparam);
  const trainfiles = await trainingmanager.loadtype(typeparam);
  res.render('type.twig', { responsefiles, trainfiles, type: typeparam });
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
  if (catparam === 'response') {
    fileres = await responsemanager.loadfile(`${typeparam}.${nameparam}`);
  } else if (catparam === 'training') {
    fileres = await trainingmanager.loadfile(`${typeparam}-${nameparam}`);
  }

  res.render('file.twig', {
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
      await trainingmanager.updatefile(req.body.file.replace('.', '-'), json);
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
      const realtypes: any[] = [];
      const restypes = await responsemanager.gettypes();
      const traintypes = await trainingmanager.getTypes();
      const types = restypes;
      traintypes.forEach((t: any) => {
        if (!types.includes(t)) {
          types.push(t);
        }
      });
      await types.reduce(async (previous: any, e: any) => {
        await previous;
        const responsefiles = await responsemanager.loadtype(e);
        const trainfiles = await trainingmanager.loadtype(e);
        realtypes.push({
          response: responsefiles,
          training: trainfiles,
          name: e,
        });
      }, Promise.resolve());
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(realtypes));
      return;
    }
  } catch (e) {
    // Do nothing
  }
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end();
}

export default {
  home,
  type,
  file,
  save,
  getfiles,
};
