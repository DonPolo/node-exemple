// @flow

require('dotenv').config();

const defaultConfig = {
  PORT: process.env.PORT || 3000,
  DB: {
    username: process.env.DB_USERNAME || 'admin',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'database',
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
    options: { encrypt: true }
  },
  MAIL: {
    enable: process.env.MAIL_ENABLE === 'true' || false,
    host: process.env.MAIL_SMTP_SERVER || 'localhost',
    port: process.env.MAIL_SMTP_PORT || 25,
    secure: process.env.MAIL_SMTP_SECURE === 'true' || false,
    recipient: process.env.MAIL_RECIPIENT || undefined,
    sender: process.env.MAIL_SENDER || '',
    sav: process.env.MAIL_SAV || 'service-si@easy-life.fr'
  },
  TWILIO: {
    accountId: process.env.TWILIO_ACCOUNT_ID || 'twilio_account',
    authToken: process.env.TWILIO_AUTH_TOKEN || 'auth_token'
  },
  DIALOG_FLOW: {
    projectId: process.env.DIALOG_FLOW_PROJECT_ID || 'agent',
    environment: process.env.DIALOG_FLOW_ENVIRONMENT || 'draft',
    languageCode: process.env.DIALOG_FLOW_LANGUAGE_CODE || 'en',
    username: process.env.DIALOG_FLOW_USERNAME || null,
    password: process.env.DIALOG_FLOW_PASSWORD || null,
    consoleService: process.env.DIALOG_FLOW_CONSOLE_SERVICE || 'console',
    consoleServiceId: process.env.DIALOG_FLOW_CONSOLE_SERVICE_ID || '6910',
    consoleUserId: process.env.DIALOG_FLOW_CONSOLE_USER_ID || '0DHSENJP9Z',
    consoleUserType: process.env.DIALOG_FLOW_USER_TYPE || 'userId',
    intent: {
      contact: process.env.DIALOG_FLOW_INTENT_CONTACT,
      relaisColis: process.env.DIALOG_FLOW_INTENT_RELAIS_COLIS,
      schedule: process.env.DIALOG_FLOW_INTENT_SCHEDULE,
      services: process.env.DIALOG_FLOW_INTENT_SERVICES,
      infos: process.env.DIALOG_FLOW_INTENT_INFOS,
      globalRequest: process.env.DIALOG_FLOW_INTENT_GLOBAL_REQUEST,
      globalRequestLocker: process.env.DIALOG_FLOW_INTENT_GLOBAL_REQUEST_LOCKER,
      searchUserByMail: process.env.DIALOG_FLOW_INTENT_SEARCH_BY_MAIL,
      needRegistration: process.env.DIALOG_FLOW_INTENT_NEED_REGISTRATION,
      registration: process.env.DIALOG_FLOW_INTENT_REGISTRATION,
      registerLastName: process.env.DIALOG_FLOW_INTENT_REGISTER_LAST_NAME,
      registerGivenName: process.env.DIALOG_FLOW_INTENT_REGISTER_GIVEN_NAME,
      fallback: process.env.DIALOG_FLOW_INTENT_FALLBACK
    },
    context: {
      askUserMail: process.env.DIALOG_FLOW_CONTEXT_USER_ASK_MAIL,
      needRegistration: process.env.DIALOG_FLOW_CONTEXT_USER_NEED_REGISTRATION,
      userRegistration: process.env.DIALOG_FLOW_CONTEXT_USER_REGISTRATION,
      userRegisterGivenName:
        process.env.DIALOG_FLOW_CONTEXT_USER_REGISTER_GIVEN_NAME,
      userRequestLocker:
        process.env.DIALOG_FLOW_CONTEXT_USER_GLOBAL_REQUEST_LOCKER
    }
  },
  SLACK: {
    apiToken: process.env.SLACK_API_TOKEN || 'slack_token'
  }
};

export default {
  ...defaultConfig
};
