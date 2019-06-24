import Nexmo from 'nexmo';
import config from '../config';

const sendSms = (
  telTo: string,
  telFrom: string,
  text: string,
  opt: any = {},
) => {
  const nexmo = new Nexmo({
    apiKey: config.NEXMO.apiKey,
    apiSecret: config.NEXMO.apiSecret,
  });
  nexmo.message.sendSms(telTo, telFrom, text, opt);
};
export default {
  sendSms,
};
