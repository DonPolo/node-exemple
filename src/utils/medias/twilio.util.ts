import twilio from 'twilio';
import config from '../../config';

export default async function sendTextMessage(
  msg: string,
  telTo: string,
  telFrom: string,
) {
  const client = twilio(config.TWILIO.accountId, config.TWILIO.authToken);
  client.messages
    .create({
      body: msg,
      to: telTo,
      from: telFrom,
    })
    .then(/* Do what you want */);
}
