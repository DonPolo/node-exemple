/**
 * Class for required error
 *
 * @class RequiredError
 */
export default class RequiredError {
  /**
   * Make error pretty
   *
   * @static
   * @param {Array} errors - Array of error Object
   * @returns {Object} - errors - Pretty Object transform
   */
  static makePretty(errors: object[]) {
    return errors.reduce((obj: any, error: any) => {
      const nObj: any = obj;
      nObj[error.field] = error.messages
        ? error.messages[0].replace(/"/g, '')
        : error.message;
      return nObj;
    }, {});
  }
}
