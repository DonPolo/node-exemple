import express from 'express';
import logger from '../config/logger';

import twilio from 'twilio';
import plivo from 'plivo';
import nexmo from '../utils/medias/nexmo.util';

import HTTPStatus from 'http-status';
import APIError from '../utils/error/apierror.util';
import handleRequest from '../utils/handlerequest.util';

import '../config/i18n';

const { MessagingResponse } = twilio.twiml;

export async function twilioWebHook(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    if (req.body.From && req.body.Body && req.body.To) {
      const telFrom: string = req.body.From;
      const query: string = req.body.Body;
      const telTo: string = req.body.To;

      const response = await handleRequest(query);

      if (response) {
        // Answer with Twilio
        const twiml = new MessagingResponse();
        // twilio(response, telFrom, telTo);
        twiml.message(response);
        res.writeHead(HTTPStatus.OK, { 'Content-Type': 'text/xml' });
        return res.end(twiml.toString());
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

export async function plivoWebHook(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    if (req.body.From && req.body.Body && req.body.To) {
      const telFrom: string = req.body.From;
      const query: string = req.body.Text;
      const telTo: string = req.body.To;

      const response = await handleRequest(query);

      if (response) {
        // Answer with Plivo
        const r = plivo.Response();
        r.addMessage(response, { src: telTo, dst: telFrom });
        res.writeHead(HTTPStatus.OK, { 'Content-Type': 'text/xml' });
        return res.end(r.toXML());
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

export async function nexmoWebHook(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    if (req.body.msisdn && req.body.text && req.body.to) {
      const telFrom: string = req.body.msisdn;
      const query: string = req.body.text;
      const telTo: string = req.body.to;

      const response = await handleRequest(query);

      if (response) {
        // Answer with Plivo
        nexmo(response, telFrom, telTo);
        res.writeHead(HTTPStatus.OK, { 'Content-Type': 'text/xml' });
        return res.end();
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
