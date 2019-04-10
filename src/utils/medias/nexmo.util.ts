import Nexmo from 'nexmo';
import config from '../../config';

export default async function sendTextMessage(
  msg: string,
  telTo: string,
  telFrom: string,
) {
  const nexm = new Nexmo({
    apiKey: config.NEXMO.apiKey,
    apiSecret: config.NEXMO.apiSecret,
  });
  nexm.message.sendSms(telFrom, telTo, msg);
}
