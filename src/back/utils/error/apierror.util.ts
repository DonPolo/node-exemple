import HttpStatus from 'http-status';

/**
 * Class representing an API error.
 *
 * @extends ExtendableError
 */
export default class APIError extends Error {
  status: number;

  /**
   * Creates an API error.
   *
   * @param {String} message - Error message.
   * @param {Number} status - HTTP status code of error.
   */
  constructor(
    message: string,
    status: number = HttpStatus.INTERNAL_SERVER_ERROR,
  ) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = status;
  }
}
