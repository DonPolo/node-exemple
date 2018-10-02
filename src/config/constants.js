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
    sender: process.env.MAIL_SENDER || ''
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
    intentContact: process.env.DIALOG_FLOW_INTENT_CONTACT,
    intentRelaisColis: process.env.DIALOG_FLOW_INTENT_RELAIS_COLIS,
    intentSchedule: process.env.DIALOG_FLOW_INTENT_SCHEDULE,
    intentServices: process.env.DIALOG_FLOW_INTENT_SERVICES,
    intentInfos: process.env.DIALOG_FLOW_INTENT_INFOS,
    intentGlobalRequest: process.env.DIALOG_FLOW_INTENT_GLOBAL_REQUEST,
    intentUserAskMail: process.env.DIALOG_FLOW_INTENT_ASK_MAIL,
    contextUserAskMail: process.env.DIALOG_FLOW_CONTEXT_USER_ASK_MAIL
  },
  SLACK: {
    apiToken: process.env.SLACK_API_TOKEN || 'slack_token'
  }
};

export default {
  ...defaultConfig
};
