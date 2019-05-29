import dotenv from 'dotenv';

dotenv.config({ debug: true });
const isDev = process.env.NODE_ENV === 'development';

const defaultConfig = {
  PORT: process.env.PORT || 3000,
  DEBUG: process.env.DEBUG || false,
  ECL: {
    url: process.env.ECL_URL || 'http://localhost',
  },
  ACCESS: {
    PSEUDO: process.env.ACCESS_PSEUDO || '',
    PWD: process.env.ACCESS_PWD || '',
  },
  DB_LOGGING: isDev,
  API_ACCESS_USERNAME: process.env.API_ACCESS_USERNAME || null,
  API_ACCESS_PASSWORD: process.env.API_ACCESS_PASSWORD || null,
  DB: {
    easywhere: {
      username: process.env.DB_EASYWHERE_USERNAME || 'admin',
      password: process.env.DB_EASYWHERE_PASSWORD || 'password',
      database: process.env.DB_EASYWHERE_DATABASE || 'database',
      host: process.env.DB_EASYWHERE_HOST || 'localhost',
      options: { encrypt: true },
      operatorsAliases: false,
    },
    username: process.env.DB_USERNAME || 'admin',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'database',
    host: process.env.DB_HOST || 'localhost',
    options: { encrypt: true },
    operatorsAliases: false,
  },
  INTENTS: {
    register: {
      default: process.env.INTENT_REGISTER_DEFAULT || '',
      mail: process.env.INTENT_REGISTER_MAIL || '',
      name: process.env.INTENT_REGISTER_NAME || '',
      code: process.env.INTENT_REGISTER_CODE || '',
    },
    infos: {
      openingtime: process.env.INTENT_INFOS_OPENTIME || '',
      contact: process.env.INTENT_INFOS_CONTACT || '',
      services: process.env.INTENT_INFOS_SERVICES || '',
      relaiscolis: process.env.INTENT_INFOS_RELAISCOLIS || '',
      compopanier: process.env.INTENT_INFOS_COMPOPANIER || '',
      infos: process.env.INTENT_INFOS_INFOS || '',
    },
    request: {
      global: process.env.INTENT_REQUEST_GLOBAL || '',
      update: process.env.INTENT_REQUEST_UPDATE || '',
    },
    default: {
      fallback: process.env.INTENT_DEFAULT_FALLBACK || '',
    },
  },
  CONTEXTS: {
    FULFILL: {
      register: process.env.CONTEXT_FULFILL_REGISTER || '',
      registermail: process.env.CONTEXT_FULFILL_REGISTERMAIL || '',
      registercode: process.env.CONTEXT_FULFILL_REGISTERCODE || '',
      requestdetails: process.env.CONTEXT_FULFILL_REQUESTDETAILS || '',
    },
  },
  LUIS: {
    appId: process.env.LUIS_APP_ID || '',
    endpointKey: process.env.LUIS_ENDPOINT_KEY || '',
  },
  WATSON: {
    apiKey: process.env.WATSON_API_KEY || '',
    assistantId: process.env.WATSON_ASSISTANT_ID || '',
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
  },
  SLACK: {
    apiToken: process.env.SLACK_API_TOKEN || 'slack_token',
  },
  MAIL: {
    enable: process.env.MAIL_ENABLE === 'true' || false,
    host: process.env.MAIL_SMTP_SERVER || 'localhost',
    port: parseInt(process.env.MAIL_SMTP_PORT || '25', 10),
    secure: process.env.MAIL_SMTP_SECURE === 'true' || false,
    recipient: process.env.MAIL_RECIPIENT || undefined,
    sender: process.env.MAIL_SENDER || '',
    sav: process.env.MAIL_SAV || 'service-si@easy-life.fr',
  },
  NEDB: {
    ttl: parseInt(process.env.NEDB_TTL || '0', 10),
  },
  WIT: {
    accesstoken: process.env.WIT_ACCESSTOKEN || '',
  },
  SAP: {
    token: process.env.SAP_TOKEN || '',
    userslug: process.env.SAP_USERSLUG || '',
    botslug: process.env.SAP_BOTSLUG || '',
    versionslug: process.env.SAP_VERSIONSLUG || '',
    devtoken: process.env.SAP_DEV_TOKEN || '',
  },
};

export default defaultConfig;
