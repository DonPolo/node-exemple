import express from 'express';
import handlemessage from '../utils/handlemessage.util';
import {
  Request,
  ParsedResponse,
  ResultIntent,
  ResultEntity,
  ServiceResult,
} from '../utils/types.util';

export default async function(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
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
      const response: ParsedResponse | null = await handlemessage(request);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(response));
    }
  } catch (ex) {
    res.writeHead(500);
    return res.end('Error');
  }
  res.writeHead(404);
  return res.end('Missing "msg" or "from" or "types"');
}

export async function ajaxevent(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
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
          site: null,
          service: null,
          user: null,
          concierges: null,
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
      const response: ParsedResponse | null = await handlemessage(request);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(response));
    }
  } catch (e) {
    res.writeHead(500);
    return res.end('Error');
  }
  res.writeHead(404);
  return res.end('Missing "event" or "from" or "types"');
}
