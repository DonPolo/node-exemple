import express from 'express';
import responsemanager from '../utils/responsemanager.util';
import trainingmanager from '../utils/trainingmanager.util';
import analyticsmanager from '../utils/analytics.util';
import config from '../config';
import json2pyaml from 'json-to-pretty-yaml';
import yaml from 'yamljs';
import {
  ResultIntent,
  ResultEntity,
  ServiceResult,
  Request,
  ParsedResponse,
  getEmptyUserContexts,
  getEmptySiteContexts,
  AnalyticsData,
} from '../utils/types.util';
import handlemessage from '../utils/handlemessage.util';
import logger from '../config/logger';

function checkConnection(req: express.Request) {
  if (req.session) {
    return req.session.user;
  }
  return null;
}

function requireConnection(req: express.Request, res: express.Response) {
  const user = checkConnection(req);
  return {};
  if (!user) {
    res.redirect('/webapp/login');
    return null;
  }
  return user;
}

async function login(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const user = checkConnection(req);
  if (user) {
    res.redirect('/webapp');
    return;
  }
  let error = null;
  if (req.body.pseudo && req.body.pwd) {
    if (
      req.body.pseudo === config.ACCESS.PSEUDO &&
      req.body.pwd === config.ACCESS.PWD
    ) {
      if (req.session) {
        req.session.user = {
          pseudo: config.ACCESS.PSEUDO,
          pwd: config.ACCESS.PWD,
        };
        req.session.save(() => {
          res.redirect('/webapp');
        });
        return;
      }
    }
    error = 'Invalid pseudo or password';
  }
  res.render('login.twig', { error });
}

async function disconnect(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  if (req.session) {
    delete req.session.user;
    req.session.save(() => res.redirect('/webapp/login'));
  } else {
    res.redirect('/webapp/login');
  }
}

/**
 * Chat to test Lifee
 * @param req
 * @param res
 * @param next
 */
async function chat(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const user = requireConnection(req, res);
  if (!user) return;
  res.render('chat.twig', { user, nav: '1' });
}

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
  const user = requireConnection(req, res);
  if (!user) return;
  const restypes = await responsemanager.gettypes();
  const traintypes = await trainingmanager.getTypes();
  const types = restypes;
  traintypes.forEach((t: any) => {
    if (!types.includes(t)) {
      types.push(t);
    }
  });
  types.sort();
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
      files: responsefiles.sort((a: any, b: any) => {
        return a.beauty.localeCompare(b.beauty);
      }),
      type: e,
    });
    result.training.push({
      files: trainfiles.sort(),
      type: e,
    });
  }, Promise.resolve());
  res.render('home.twig', { user, files: result, nav: '2' });
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
  const user = requireConnection(req, res);
  if (!user) return;
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
      'site.groups',
      'site.groups.length',
      'other.numLocker',
      'other.compopanier',
    ];
  } else if (catparam === 'training') {
    fileres = await trainingmanager.loadfile(`${typeparam}-${nameparam}`);
  }
  res.render('file.twig', {
    params,
    user,
    paramsstr: JSON.stringify(params),
    file: json2pyaml.stringify(fileres).replace(/\"/g, '\\"'),
    type: typeparam,
    filename: nameparam,
    cat: catparam,
    nav: '2',
  });
}

async function addresponse(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const user = requireConnection(req, res);
  if (!user) return;
  if (req.body.name && req.body.type && req.body.beauty) {
    const intent = req.body.name;
    const type = req.body.type;
    const beautyname = req.body.beauty;
    await responsemanager.addResponse({
      intent,
      type,
      beautyname,
      desc: '',
      responses: {},
    });
  }
  res.render('addresponse.twig', { user, nav: '3' });
}

async function analytics(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  // Deal with archived
  let isarchived = false;
  if (req.query.archived) {
    isarchived = true;
  }
  // Deal with the page
  let ppage = '1';
  if (req.query.page) {
    ppage = req.query.page;
  }
  let page = parseInt(ppage, 10);
  if (page < 1) {
    page = 0;
  }
  const nb: number = await analyticsmanager.getNb(isarchived);
  let nbpage: number = Math.trunc(nb / 20);
  if (20 * nbpage < nb) nbpage += 1;
  if (page > nbpage) {
    page = nbpage;
  }

  const datas: AnalyticsData[] = await analyticsmanager.getAll(
    page,
    isarchived,
  );

  res.render('analytics.twig', {
    nbpage,
    datas,
    archived: isarchived,
    curpage: page,
    nav: '4',
  });
}

async function archived(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const user = requireConnection(req, res);
  if (!user) return;
  if (req.body.id) {
    await analyticsmanager.archived(req.body.id);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({}));
  }
  res.writeHead(404);
  return res.end('Missing "msg" or "from" or "types"');
}

async function recover(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const user = requireConnection(req, res);
  if (!user) return;
  if (req.body.id) {
    await analyticsmanager.recover(req.body.id);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify({}));
  }
  res.writeHead(404);
  return res.end('Missing "msg" or "from" or "types"');
}

/**
 * Get a message from chat
 * @param req
 * @param res
 * @param next
 */
async function sendmessage(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const user = requireConnection(req, res);
  if (!user) return;
  try {
    if (req.body.msg && req.body.from && req.body.types) {
      const msg = req.body.msg;
      const from = req.body.from;
      const types = req.body.types;
      const request: Request = {
        msg,
        from,
        to: '+33755536910',
        service: 'sap',
        platform: 'tel',
        acceptedtypes: types,
      };
      const respons: ParsedResponse | null = await handlemessage(request);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(respons));
    }
  } catch (ex) {
    logger.error(ex);
    res.writeHead(500);
    return res.end('Error');
  }
  res.writeHead(404);
  return res.end('Missing "msg" or "from" or "types"');
}

/**
 * Get an event sent by chat like button or dropdown
 * @param req
 * @param res
 * @param next
 */
async function sendevent(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const user = requireConnection(req, res);
  if (!user) return;
  try {
    if (req.body.from && req.body.types && req.body.event) {
      const from = req.query.from;
      const types = req.body.types;
      const intents: ResultIntent[] = [];
      const entities: ResultEntity[] = [];
      req.body.event.forEach((a: any) => {
        intents.push({
          confidence: 0.1,
          name: a.action.split('|')[1],
        });
        entities.push({
          name: 'all',
          value: a.action.split('|')[0],
        });
      });
      const result: ServiceResult = {
        intents,
        entities,
        response: null,
        query: '',
        contexts: {
          fulfill: [],
          site: getEmptySiteContexts(),
          service: null,
          user: getEmptyUserContexts(),
          other: null,
        },
      };
      const request: Request = {
        from,
        result,
        msg: '',
        to: '+33755536910',
        service: 'sap',
        platform: 'tel',
        acceptedtypes: types,
      };
      const respons: ParsedResponse | null = await handlemessage(request);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(respons));
    }
  } catch (e) {
    logger.error(e);
    res.writeHead(500);
    return res.end('Error');
  }
  res.writeHead(404);
  return res.end('Missing "event" or "from" or "types"');
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
  const user = requireConnection(req, res);
  if (!user) return;
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

async function deleteelem(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    if (req.body.cat === 'response') {
      await responsemanager.delete(`${req.body.type}.${req.body.name}`);
    }
  } catch (err) {
    res.writeHead(500);
    res.end();
    return;
  }
  res.writeHead(200);
  res.end();
}

async function modif(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    if (req.body.cat === 'response') {
      await responsemanager.modif(
        `${req.body.type}.${req.body.name}`,
        req.body.newtype,
        req.body.newname,
      );
    }
  } catch (err) {
    res.writeHead(500);
    res.end();
    return;
  }
  res.writeHead(200);
  res.end();
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
  const user = requireConnection(req, res);
  if (!user) return;
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
      types.sort();
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
          files: responsefiles.sort((a: any, b: any) => {
            return a.beauty.localeCompare(b.beauty);
          }),
          type: e,
        });
        result.training.push({
          files: trainfiles.sort(),
          type: e,
        });
      }, Promise.resolve());
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(result));
      return;
    }
  } catch (e) {
    logger.error(e);
  }
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end();
}

async function getentities(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const user = requireConnection(req, res);
  if (!user) return;
  try {
    const entities = await trainingmanager.getEntities();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(entities));
    return;
  } catch (e) {
    logger.error(e);
  }
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end();
}

export default {
  login,
  disconnect,
  chat,
  home,
  file,
  addresponse,
  analytics,
  sendmessage,
  sendevent,
  save,
  getfiles,
  getentities,
  modif,
  archived,
  recover,
  delete: deleteelem,
};
