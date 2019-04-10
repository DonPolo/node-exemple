import logger from '../config/logger';
import Site from '../models/Site.model';
import i18n from 'i18next';

async function getByCode(parameter: string, func: (code: string) => any) {
  const possibleCodes: string[] = parameter.split(' ');
  let res: string | null = null;
  await possibleCodes.reduce(async (previous, code) => {
    logger.info(` Code : ${code}`);
    await previous;
    if (!res && Site.checkCode(code)) {
      res = await func(code);
      logger.info(` Res : ${res}`);
    }
  }, Promise.resolve());
  return res;
}

async function nomFilialeByCode(parameters: any) {
  const param: string = parameters.fields.site_code.stringValue;
  const nomFiliale: any = await getByCode(param, (code: string) =>
    Site.getFiliale(code),
  );
  logger.info(` Filiale : ${nomFiliale}`);
  let res = '';
  if (nomFiliale) {
    res = i18n.t('intent.filiale.success', { filiale: nomFiliale });
  } else {
    res = i18n.t('intent.filiale.not-found');
  }
  return res;
}

async function nomSiteByCode(parameters: any) {
  const param: string = parameters.fields.site_code.stringValue;
  const nomSite: any = await getByCode(param, (code: string) =>
    Site.getNomSite(code),
  );
  let res = '';
  if (nomSite) {
    res = i18n.t('intent.site.success', { site: nomSite });
  } else {
    res = i18n.t('intent.site.not-found');
  }
  return res;
}

export default async function handle(intentName: string, parameters: any) {
  switch (intentName) {
    case 'filiale':
      return await nomFilialeByCode(parameters);
    case 'nom_site':
      return await nomSiteByCode(parameters);
    default:
      return null;
  }
}
