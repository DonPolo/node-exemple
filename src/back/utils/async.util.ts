import request from 'request';

/**
 * Send an http request and return the result and the body
 * @param req the http request to send
 */
export const execrequest: any = async (req: string) => {
  return new Promise((resolve, reject) => {
    request(req, (err: any, res: any, body: any) => {
      if (err) {
        reject(err);
      } else {
        resolve({ res, body });
      }
    });
  });
};
