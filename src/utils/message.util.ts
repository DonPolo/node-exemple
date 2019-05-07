import * as nodemailer from 'nodemailer';
import config from '../config/';
import logger from '../config/logger';

const transporter = nodemailer.createTransport({
  host: config.MAIL.host,
  port: config.MAIL.port,
  secure: config.MAIL.secure,
  // auth: {
  //     user: 'xxx@xx.com',
  //     pass: 'xxxx'
  // },
  tls: { rejectUnauthorized: false },
});

export interface MailOptions {
  from: string;
  to: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  replyTo?: string;
  subject: string;
  text?: string;
  html?: string;
  attachments?: any[];
}

/**
 * Send a mail
 * @param options The mail to send
 * @param throwError if true the function can throw errors
 */
export const sendMessage = async (
  options: MailOptions,
  throwError: boolean = true,
) => {
  try {
    if (config.MAIL.enable) {
      const mailOptions = {
        ...options,
        to: config.MAIL.recipient || options.to,
      };
      const result = await transporter.sendMail(mailOptions);
    }
  } catch (e) {
    logger.error(e);
    if (throwError) throw e;
  }
};
