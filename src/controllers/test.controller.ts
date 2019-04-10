import express from 'express';
import handleRequest from '../utils/handlerequest.util';
import HTTPStatus from 'http-status';
import APIError from '../utils/error/apierror.util';
import fs from 'fs';
import logger from '../config/logger';

export function defaultpage(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  res.writeHead(HTTPStatus.OK, { 'Content-Type': 'text/html' });
  const page = fs.readFileSync(
    'C:/Users/Visiteur/Documents/Lifee/lifee/templates/test.html',
  );
  return res.end(page);
}

export async function question(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    if (req.query.ask) {
      const query: string = req.query.ask;

      const response = await handleRequest(query);
      logger.info(`Response : ${response}`);
      if (response) {
        res.writeHead(HTTPStatus.OK, {
          'Content-Type': 'text/plain; charset=utf-8',
        });
        return res.end(response);
      }
      return res.sendStatus(HTTPStatus.OK);
    }
    return next(
      new APIError(
        "Missing 'From' or 'Body' param in body",
        HTTPStatus.BAD_REQUEST,
      ),
    );
  } catch (err) {
    err.status = HTTPStatus.INTERNAL_SERVER_ERROR;
    return next(err);
  }
}
