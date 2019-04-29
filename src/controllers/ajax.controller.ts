import express from 'express';
import handlemessage from '../utils/handlemessage.util';
import { Request, Response, ParsedResponse } from '../utils/types.util';

export default async function(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    if (req.query.msg && req.query.from) {
      const msg = req.query.msg;
      const from = req.query.from;
      const request: Request = {
        msg,
        from,
        to: '+33755536910',
        service: 'sap',
        platform: 'tel',
        acceptedtypes: ['text', 'btn', 'dropdown'],
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
  return res.end('Missing "msg" or "from"');
}
