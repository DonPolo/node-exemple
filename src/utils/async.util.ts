import request from 'request';

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
