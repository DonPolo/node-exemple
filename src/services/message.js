// @flow
/* eslint-disable no-console */
import mailer from 'nodemailer';

import { logger } from '../config/winston';
import config from '../config/constants';

const transporter = mailer.createTransport({
  host: config.MAIL.host,
  port: config.MAIL.port,
  secure: config.MAIL.secure
  // auth: {
  //     user: 'xxx@xx.com',
  //     pass: 'xxxx'
  // }
});

export const sendMessage = async (
  options: {
    from: string,
    to: string | string[],
    cc?: string | string[],
    bcc?: string | string[],
    replyTo?: string,
    subject: string,
    text?: string,
    html?: string,
    attachments?: Object[]
  },
  throwError: boolean = true
) => {
  try {
    if (config.MAIL.enable) {
      const mailOptions = {
        ...options,
        to: config.MAIL.recipient || options.to
      };
      logger.info('Try to send mail', options);
      const result = await transporter.sendMail(mailOptions);
      logger.info('Mail sent, result', result);
    } else {
      logger.info('Mail to send:');
      logger.info(`\tFrom: ${options.from}`);
      logger.info(
        `\tTo: ${Array.isArray(options.to) ? options.to.join(',') : options.to}`
      );
      logger.info(`\tSubject: ${options.subject}`);
      logger.info(`\tMessage: ${options.text || options.html}`);
    }
  } catch (e) {
    logger.error('Unable to send mail:', e);
    if (throwError) throw e;
  }
};
