import express from 'express';
import { Request, ParsedResponse } from '../utils/types.util';
import handlemessage from '../utils/handlemessage.util';
import HTTPStatus from 'http-status';
import APIError from '../utils/error/apierror.util';
import config from '../config';
// Twilio
import twilio from 'twilio';
const { MessagingResponse } = twilio.twiml;
// Nexmo
import Nexmo from 'nexmo';
import logger from '../config/logger';

async function process(
  msg: string,
  from: string,
  to: string,
): Promise<string | null> {
  const request: Request = {
    msg,
    from,
    to,
    service: 'sap',
    platform: 'tel',
    acceptedtypes: ['text'],
  };
  const response: ParsedResponse | null = await handlemessage(request);
  if (!response) return null;
  let res = '';
  response.responses.forEach((r: any) => {
    res += `${r.text}\n`;
  });
  return res;
}

async function twiliowebhook(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    if (req.body.From && req.body.Body && req.body.To) {
      const telFrom: string = req.body.From;
      const query: string = req.body.Body;
      const telTo: string = req.body.To;
      const result = await process(query, telFrom, telTo);
      if (result) {
        // Answer with Twilio
        const twiml = new MessagingResponse();
        twiml.message(result);
        res.writeHead(HTTPStatus.OK, { 'Content-Type': 'text/xml' });
        return res.end(twiml.toString());
      }
      return res.sendStatus(HTTPStatus.OK);
    }
    return next(
      new APIError(
        "Missing 'From' or 'Body' or 'To' param in body",
        HTTPStatus.BAD_REQUEST,
      ),
    );
  } catch (err) {
    logger.error(err);
    err.status = HTTPStatus.INTERNAL_SERVER_ERROR;
    return next(err);
  }
}

async function nexmowebhook(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  try {
    if (req.body.msisdn && req.body.text && req.body.to) {
      const telFrom: string = req.body.msisdn;
      const query: string = req.body.text;
      const telTo: string = req.body.to;

      const result = await process(query, telFrom, telTo);

      if (result) {
        // Answer with Nexmo
        const nexmo = new Nexmo({
          apiKey: config.NEXMO.apiKey,
          apiSecret: config.NEXMO.apiSecret,
        });
        nexmo.message.sendSms(telTo, telFrom, result);
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
    logger.error(err);
    err.status = HTTPStatus.INTERNAL_SERVER_ERROR;
    return next(err);
  }
}

export default {
  twilio: twiliowebhook,
  nexmo: nexmowebhook,
};
