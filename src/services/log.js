// @flow

/**
 * Error handler for api routes
 */

import PrettyError from 'pretty-error';
import HTTPStatus from 'http-status';

import APIError, { RequiredError } from './error';

const isDev = process.env.NODE_ENV === 'development';

// eslint-disable-next-line no-unused-vars
export default function logErrorService(
  err: $Subtype<Error>,
  req: $Subtype<express$Request>,
  res: express$Response,
  next: express$NextFunction
) {
  if (!err) {
    return new APIError(
      'Error with the server!',
      HTTPStatus.INTERNAL_SERVER_ERROR,
      true
    );
  }

  if (isDev) {
    const pe = new PrettyError();
    pe.skipNodeFiles();
    pe.skipPackage('express');

    // eslint-disable-next-line no-console
    console.log(pe.render(err));
  }

  const error: Object = {
    message: err.message || 'Internal Server Error.'
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
