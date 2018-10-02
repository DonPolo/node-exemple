// @flow
/* eslint-disable no-console */
import mailer from 'nodemailer';

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

export const sendMessage = async (options: {
  from: string,
  to: string | string[],
  cc?: string | string[],
  bcc?: string | string[],
  subject: string,
  text: string,
  html?: string,
  attachments?: Object[]
}) => {
  try {
    if (config.MAIL.enable) {
      const mailOptions = {
        ...options,
        to: config.MAIL.recipient || options.to
      };
      console.log('Try to send mail: ', options);
      const result = await transporter.sendMail(mailOptions);
      console.log('Mail sent, result: ', result);
    } else {
      console.log('Mail to send:');
      console.log('\tFrom: ', options.from);
      console.log(
        '\tTo: ',
        Array.isArray(options.to) ? options.to.join(',') : options.to
      );
      console.log('\tSubject: ', options.subject);
      console.log('\tMessage: ', options.text);
      console.log();
    }
  } catch (e) {
    console.error('Unable to send mail: ', e);
    throw e;
  }
};
