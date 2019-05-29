// @flow

import passport from 'passport';
import { BasicStrategy } from 'passport-http';

import config from '../config';

/**
 * Basic Login Auth based on username/password stored in env variable
 */
const basicEnvAuthLogin = new BasicStrategy((username, password, done) => {
  try {
    if (
      config.API_ACCESS_USERNAME === username &&
      config.API_ACCESS_PASSWORD === password
    ) {
      return done(null, {
        username,
      });
    }
    return done(null, false);
  } catch (e) {
    return done(e, false);
  }
});

passport.use(basicEnvAuthLogin);

export const authBasicEnv = passport.authenticate('basic', { session: false });
