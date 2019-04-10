import express from 'express';

import PrettyError from 'pretty-error';
import HTTPStatus from 'http-status';

import logger from '../config/logger';

import APIError from './error/apierror.util';
import RequiredError from './error/requirederror.util';

const isDev = process.env.NODE_ENV === 'development';

// eslint-disable-next-line no-unused-vars
export default function logErrorService(
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) {
  if (!err) {
    return new APIError(
      'Error with the server!',
      HTTPStatus.INTERNAL_SERVER_ERROR,
    );
  }

  if (isDev) {
    const pe = new PrettyError();
    pe.skipNodeFiles();
    pe.skipPackage('express');

    // eslint-disable-next-line no-console
    logger.info(pe.render(err));
  }

  const error: any = {
    message: err.message || 'Internal Server Error.',
    errors: err.errors,
  };

  if (err.errors) {
    const { errors } = err;
    error.errors = {};
    if (Array.isArray(errors)) {
      error.errors = RequiredError.makePretty(errors);
    } else {
      Object.keys(errors).forEach(key => {
        error.errors[key] = errors[key].message;
      });
    }
  }

  res.status(err.status || HTTPStatus.INTERNAL_SERVER_ERROR).json(error);

  return next();
}
