import plivo from 'plivo';
import config from '../../config';

export default async function sendTextMessage(
  msg: string,
  telTo: string,
  telFrom: string,
) {
  const client = plivo(config.PLIVO.accountId, config.PLIVO.authToken);
  client.messages
    .create({
      telFrom,
      telTo,
      msg,
    })
    .then(/* Do what you want */);
}
