import dotenv from 'dotenv';

dotenv.config({ debug: true });
const isDev = process.env.NODE_ENV === 'development';

const defaultConfig = {
  PORT: process.env.PORT || 3000,
  DEBUG: process.env.DEBUG || false,
  ECL: {
    url: process.env.ECL_URL || 'http://localhost',
  },
  DB_LOGGING: isDev,
  DB: {
    username: process.env.DB_USERNAME || 'admin',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'database',
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
    options: { encrypt: true },
    operatorsAliases: false,
  },

  TWILIO: {
    accountId: process.env.TWILIO_ACCOUNT_ID || 'twilio_account',
    authToken: process.env.TWILIO_AUTH_TOKEN || 'auth_token',
  },
  PLIVO: {
    accountId: process.env.PLIVO_ACCOUNT_ID || 'plivo_account',
    authToken: process.env.PLIVO_AUTH_TOKEN || 'auth_token',
  },
  NEXMO: {
    apiKey: process.env.NEXMO_API_KEY || 'nexmo_api_key',
    apiSecret: process.env.NEXMO_API_SECRET || 'nexmo_api_secret',
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
      globalRequestDetails:
        process.env.DIALOG_FLOW_INTENT_GLOBAL_REQUEST_DETAILS,
      searchUserByMail: process.env.DIALOG_FLOW_INTENT_SEARCH_BY_MAIL,
      needRegistration: process.env.DIALOG_FLOW_INTENT_NEED_REGISTRATION,
      registration: process.env.DIALOG_FLOW_INTENT_REGISTRATION,
      registerLastName: process.env.DIALOG_FLOW_INTENT_REGISTER_LAST_NAME,
      registerGivenName: process.env.DIALOG_FLOW_INTENT_REGISTER_GIVEN_NAME,
      registerSiteGroup: process.env.DIALOG_FLOW_INTENT_REGISTER_SITE_GROUP,
      fallback: process.env.DIALOG_FLOW_INTENT_FALLBACK,
    },
    context: {
      askUserMail: process.env.DIALOG_FLOW_CONTEXT_USER_ASK_MAIL,
      needRegistration: process.env.DIALOG_FLOW_CONTEXT_USER_NEED_REGISTRATION,
      userRegistration: process.env.DIALOG_FLOW_CONTEXT_USER_REGISTRATION,
      userRegisterGivenName:
        process.env.DIALOG_FLOW_CONTEXT_USER_REGISTER_GIVEN_NAME,
      userRegisterSiteGroup:
        process.env.DIALOG_FLOW_CONTEXT_USER_REGISTER_SITE_GROUP,
      userRequestDetails:
        process.env.DIALOG_FLOW_CONTEXT_USER_GLOBAL_REQUEST_DETAILS,
    },
  },
  SLACK: {
    apiToken: process.env.SLACK_API_TOKEN || 'slack_token',
  },
};

export default defaultConfig;
