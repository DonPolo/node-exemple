// @flow

import httpStatus from 'http-status';

/**
 * @extends Error
 */
class ExtendableError extends Error {
  status: number;
  isPublic: boolean;
  isOperational: boolean;

  constructor(message: string, status: number, isPublic: boolean) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
    this.isPublic = isPublic;
    this.isOperational = true;
    Error.captureStackTrace(this);
  }
}

/**
 * Class representing an API error.
 *
 * @extends ExtendableError
 */
class APIError extends ExtendableError {
  /**
   * Creates an API error.
   *
   * @param {String} message - Error message.
   * @param {Number} status - HTTP status code of error.
   * @param {Boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(
    message: string,
    status: number = httpStatus.INTERNAL_SERVER_ERROR,
    isPublic: boolean = false
  ) {
    super(message, status, isPublic);
  }
}

/**
 * Class for required error
 *
 * @class RequiredError
 */
export class RequiredError {
  /**
   * Make error pretty
   *
   * @static
   * @param {Array} errors - Array of error Object
   * @returns {Object} - errors - Pretty Object transform
   */
  static makePretty(errors: Array<Object>) {
    return errors.reduce((obj, error) => {
      const nObj = obj;
      nObj[error.field] = error.messages
        ? error.messages[0].replace(/"/g, '')
        : error.message;
      return nObj;
    }, {});
  }
}

export default APIError;
