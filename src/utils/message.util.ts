import * as nodemailer from 'nodemailer';
import config from '../config/';

const transporter = nodemailer.createTransport({
  host: config.MAIL.host,
  port: 25,
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
    if (throwError) throw e;
  }
};
