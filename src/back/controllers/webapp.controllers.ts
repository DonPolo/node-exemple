import express from 'express';
import pyaml from 'json-to-pretty-yaml';
import responsemanager from '../utils/responsemanager.util';
import trainingmanager from '../utils/trainingmanager.util';
import analyticsmanager from '../utils/analytics.util';
import config from '../config';
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
} from '../../types/types.util';
import handlemessage from '../utils/handlemessage.util';
import logger from '../config/logger';
import template from '../templates/app.html';

function checkConnection(req: express.Request) {
  if (req.session && req.session.user) {
    return req.session.user;
  }
  return null;
}

/**
 * Get all the response files
 * @returns response files array
 */
async function getFiles() {
  const result: {
    response: any[];
    training: any[];
  } = {
    response: await responsemanager.getAll(),
    training: await trainingmanager.getFiles(),
  };
  return result;
}

/**
 * Try to log the user
 * @param req the express request
 * @returns the user or null
 */
function login(req: express.Request) {
  const user = checkConnection(req);
  if (user) {
    return user;
  }
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
        return req.session.user;
      }
    }
  }
  return null;
}

async function disconnect(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  if (req.session && req.session.user) {
    delete req.session.user;
    req.session.save(() => res.redirect('/webapp/login'));
  } else {
    res.redirect('/webapp/login');
  }
}

async function archived(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const user = checkConnection(req);
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
  const user = checkConnection(req);
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
  const user = checkConnection(req);
  if (!user) return;
  try {
    if (req.body.msg && req.body.from && req.body.types) {
      const msg = req.body.msg;
      const from = req.body.from;
      const types = req.body.types;
      const request: Request = {
        msg,
        from,
        to: '+33757916905',
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
  const user = checkConnection(req);
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
          name: '##all##',
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
        to: '+33757916905',
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
  const user = checkConnection(req);
  if (!user) return;
  let error = null;
  try {
    const json = yaml.parse(req.body.code);
    if (req.body.cat === 'response') {
      await responsemanager.save(req.body.code, json);
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
  const user = checkConnection(req);
  if (!user) return;
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
  res.end(JSON.stringify({}));
}

async function modif(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  const user = checkConnection(req);
  if (!user) return;
  try {
    if (req.body.cat === 'response') {
      await responsemanager.modifFile(
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
  res.end(JSON.stringify({}));
}

async function api(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  if (req.query.query) {
    const query = req.query.query;
    let user = checkConnection(req);
    if (!user) {
      user = null;
    }
    if (user || query === 'user' || query === 'login') {
      console.log('Query : ' + query);
      switch (query) {
        case 'home':
          const result = await getFiles();
          console.log(result);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(result));
          break;
        case 'login':
          let log = await login(req);
          if (!log) {
            log = {
              error: true,
              msg: 'Invalid pseudo or password',
            };
          }
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(log));
          break;
        case 'addresponse':
          const intent = req.body.name;
          const type = req.body.type;
          const beautyname = req.body.beauty;
          const big_intent = req.body.big_intent;
          const response = await responsemanager.addResponse({
            intent,
            type,
            beautyname,
            big_intent,
            desc: '',
            responses: {},
          });
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(response));
          break;
        case 'analytics':
          const nb: number = await analyticsmanager.getNb(true);
          const datas: AnalyticsData[] = await analyticsmanager.getAll();
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ nb, datas }));
          break;
        case 'entities':
          const entities = await trainingmanager.getEntities();
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(entities));
          break;
        case 'params':
          const params = [
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
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(params));
          break;
        case 'user':
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify(user));
          break;
        case 'file':
          let fileres: any;
          fileres = await trainingmanager.loadfile(req.query.intent);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(
            JSON.stringify({
              file: pyaml.stringify(fileres),
            }),
          );
          break;
        default:
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end();
          break;
      }
      return;
    }
    res.writeHead(401, { 'Content-Type': 'text/plain' });
    res.end();
    return;
  }
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end();
}

async function all(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(template);
}

export default {
  login,
  disconnect,
  sendmessage,
  sendevent,
  save,
  modif,
  archived,
  recover,
  api,
  all,
  delete: deleteelem,
};
