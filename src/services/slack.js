// @flow
import request from 'request';

import config from '../config/constants';

const getUserURL = 'https://slack.com/api/users.profile.get';

export const getSlackEmail = (userId: string): Promise<string | null> =>
  new Promise((resolve, reject) => {
    request.get(
      {
        url: `${getUserURL}?token=${config.SLACK.apiToken}&user=${userId}`,
        json: true
      },
      (err, response, body) => {
        if (err) reject(err);
        else if (body && body.profile && body.profile.email)
          resolve(body.profile.email);
        else resolve(null);
      }
    );
  });
