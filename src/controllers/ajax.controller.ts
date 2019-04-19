import express from 'express';
import handlemessage from '../utils/handlemessage.util';

export default async function(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    if (req.query.msg && req.query.from) {
      const msg = req.query.msg;
      const from = req.query.from;
      const response = await handlemessage(
        msg,
        from,
        '+33755536910',
        'sap',
        'tel',
      );
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      return res.end(JSON.stringify(response));
    }
  } catch (ex) {
    res.writeHead(500);
    return res.end('Error');
  }
  res.writeHead(404);
  return res.end('Missing "msg" or "from"');
}
