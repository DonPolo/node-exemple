import { Sequelize } from 'sequelize';
import moment from 'moment';
import uuid from 'uuid';

import config from '../config';
import format from '../utils/format.util';

const isDev = process.env.NODE_ENV === 'development';

const ecl = new Sequelize(
  config.DB.database,
  config.DB.username,
  config.DB.password,
  {
    ...config.DB,
    dialect: 'mysql',
    dialectOptions: {
      charset: 'latin1',
    },
    logging: isDev,
  },
);

export interface Site {
  id: string;
  code: string;
  libelle: string;
  email: string;
  telephone: string;
  botNumber: string;
  horaires: string;
  horairesplus: any;
  infos: string;
  guideServices: string;
  relaisColis: string;
  concierges: {
    concierges: Concierge[];
    prenomsconcierges: string;
    nb: number;
    genre: string;
  };
  groups: SiteGroup[];
  locale: string;
}

export interface SiteGroup {
  id: string;
  nom: string;
}

export interface Concierge {
  prenom: string;
  nom: string;
  trigramme: string;
}

export interface User {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  group: string;
}

export type RequestType = 'SMS' | 'casier';

interface Request {
  text: string;
  type: RequestType;
  numLocker?: number;
}

export default class Ecl {
  static getPrenomConcierge(
    concierges: Concierge[] | null | undefined,
    forUser: boolean = true,
  ) {
    if (!concierges || !concierges.length) {
      return 'Pas de concierges';
    }
    if (concierges.length === 1) {
      return concierges[0].prenom;
    }
    if (concierges.length === 2)
      return `${concierges[0].prenom} et ${concierges[1].prenom}`;
    return 'Pas de concierges';
  }

  static isMultipleConcierges(concierges: Concierge[] | null | undefined) {
    return concierges && concierges.length > 1;
  }

  static getTrigrammeConcierge(concierges: Concierge[] | null | undefined) {
    if (!concierges || !concierges.length) return null;
    return concierges[0].trigramme;
  }
  ecl: Sequelize;

  constructor() {
    this.ecl = ecl;
  }

  async getSiteInfos(service: string, serviceId: string) {
    let serviceColumn;
    // Cas de la console. On fait un remplacement de valeur pour aller chercher un code site
    if (service === 'console') serviceColumn = 'corresp_04';
    else serviceColumn = service;
    const sites: any[] = await this.ecl.query(
      'SELECT `locale`, `id_re_03` AS `id` , `corresp_04` AS `code` , `cl_lb_01` AS `libelle` , `cl_re_01_u` AS `email`, `site_telephone` AS `telephone`, `site_horaires` AS `horaires`, `botInfo` AS `infos`, `botNumber` FROM `client` ' +
        `WHERE ${serviceColumn} = :serviceId LIMIT 1`,
      {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { serviceId },
      },
    );
    if (sites && sites.length) {
      const site = sites[0];
      site.guideServices = `http://ecl.easy-life.fr/gds/${sites[0].code}.pdf`;
      site.relaisColis = `http://ecl.easy-life.fr/gds/${sites[0].code}_RC.pdf`;
      const horairesplus = await this.ecl.query(
        'SELECT `JSEM` AS `jour`, `Hdeb` AS `start`, `Hfin` AS `end` FROM horaires_conciergerie WHERE `CodeSite`= :codesite',
        {
          type: Sequelize.QueryTypes.SELECT,
          replacements: { codesite: sites[0].id },
        },
      );
      site.horaires = format.horaires.formatHoraires(horairesplus);
      site.horairesplus = horairesplus;
      return site;
    }
    return Promise.resolve(null);
  }

  async getSiteGroups(siteId: string) {
    const groups: SiteGroup[] = await this.ecl.query(
      'SELECT `corresp_01` as id, `corresp_02` as nom FROM `correspondance_client` WHERE `id_re_03`=:siteId',
      {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { siteId },
      },
    );
    return groups;
  }

  async getConciergeList(siteCode: string): Promise<Concierge[]> {
    // 'LEFT JOIN `client` ON `client`.`id_re_03`=`coord`.`id_re_03FK` ' +
    // 'WHERE `client`.`corresp_04`=:siteCode and `coord`.`co_ge_03`=0',
    const concierges: Concierge[] = await this.ecl.query(
      'SELECT `coord`.`co_re_03_u` as prenom, `coord`.`co_re_02_u` as nom, `coord`.`co_re_01` as trigramme ' +
        'FROM `coordinateur` as `coord` ' +
        'LEFT JOIN `client` ON `client`.`co_re_01`=`coord`.`co_re_01` ' +
        "AND (`client`.`cl_re_03` = '0000-00-00' OR `client`.`cl_re_03` IS NULL) " +
        'WHERE `client`.`corresp_04`=:siteCode',
      {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { siteCode },
      },
    );
    return concierges;
  }

  async getUser(
    identifier: string,
    value: string,
    site: Site,
  ): Promise<User | null> {
    let where;
    switch (identifier) {
      case 'userId':
        where = '`utilisateur`.`id_re_04`=:value';
        break;
      case 'mobile':
        where = '`utilisateur`.`id_co_06_u`=:value';
        break;
      case 'email':
        where = 'lower(`utilisateur`.`id_re_01_u`) = lower(:value)';
        break;
      default:
        return Promise.resolve(null);
    }

    const users: User[] = await this.ecl.query(
      'SELECT `id_re_01_u` AS `email` , `id_re_06_u` AS `nom` , `id_re_07_u` AS `prenom` , ' +
        '`id_co_06_u` AS `telephone`, `id_re_04` AS `id` , `id_in_02` AS `group` ' +
        'FROM `utilisateur` ' +
        'JOIN `client` ON `utilisateur`.`id_re_03` = `client`.`id_re_03` ' +
        'WHERE `client`.`corresp_04`=:siteCode ' +
        `${where ? `AND ${where}` : ''};`,
      {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { value, siteCode: site.code },
      },
    );

    if (users && users.length === 1) return users[0];
    return Promise.resolve(null);
  }

  /**
   * Save user registration
   * @return token to be used in user mail validation
   * @param {*} site
   * @param {*} userId
   * @param {*} email
   * @param {*} lastName
   * @param {*} givenName
   * @param {*} siteGroup
   */
  async saveRegistration(
    site: Site,
    userId: string,
    email: string,
    lastName: string,
    givenName: string,
    siteGroup: SiteGroup | null | undefined,
  ) {
    // Get needed site info
    const sitesInfo: any[] = await this.ecl.query(
      'SELECT `id_re_03` as id, `fi_de_03` as `category`, `fi_de_04` as `group` FROM `form_inscription` WHERE `id_re_03`=:siteId',
      {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { siteId: site.id },
      },
    );
    if (!sitesInfo.length && !sitesInfo)
      throw Error(
        `Cannot save registration: unable to find site info for '${site.id}'`,
      );

    const siteInfo = sitesInfo[0];
    // Generate a token for user mail validation
    const token = uuid.v4();
    // Insert registration in database
    await this.ecl.query(
      'INSERT INTO `form_inscription_util`(`id_re_03`,`id_re_01_u`,`id_re_06_u`,`id_re_07_u`,`id_re_08`,`id_co_06_u`,`id_ge_04`,`iu_to_01`,`id_re_10`,`id_in_01`,`id_in_02`,`id_co_02_u`) ' +
        'VALUES (:siteId,:email,:lastName,:givenName,:fullName,:mobile,DATE_FORMAT(NOW(), "%Y-%m-%d"),:token,:client,:category,:group,:cp)',
      {
        type: Sequelize.QueryTypes.INSERT,
        replacements: {
          token,
          email,
          siteId: site.id,
          lastName: lastName.trim().toUpperCase(),
          givenName: givenName.trim(),
          fullName: `${lastName.trim().toUpperCase()} ${givenName.trim()}`,
          mobile: userId,
          client: siteGroup ? siteGroup.nom : null,
          category: siteInfo.category,
          group: siteInfo.group,
          cp: `${site.code.substr(0, 2)}000`, // Take the department from site code and add three 0
        },
      },
    );

    return token;
  }

  async saveUserMobile(user: User) {
    return this.ecl.query(
      'UPDATE `utilisateur` SET ' +
        '`id_co_06_u`=:telephone ' +
        'WHERE `id_re_04`=:id',
      {
        type: Sequelize.QueryTypes.UPDATE,
        replacements: {
          id: user.id,
          telephone: user.telephone,
        },
      },
    );
  }

  async saveRequest(
    request: Request,
    site: Site,
    concierges: Concierge[],
    user: User,
  ) {
    let requestNum: any[] = await this.ecl.query(
      'SELECT COUNT(`de_re_07_u`) AS count FROM `demande` ' +
        "WHERE `de_re_01_u`=:date AND `de_re_05_u`<>'abandon_p1'",
      {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { date: moment().format('YYYY-MM-DD') },
      },
    );
    if (!requestNum || !requestNum.length)
      throw Error('Cannot save request: unable to find a new request number');
    requestNum = requestNum[0].count + 1;

    let requestType;
    let requestType2;
    let typeCode;
    let detail;
    let addition;
    switch (request.type) {
      case 'casier':
        requestType = 'Demande casier';
        requestType2 = request.type;
        typeCode = 'casi';
        detail = request.numLocker
          ? `casier:${request.numLocker} ${request.text}`
          : request.text;
        addition = request.numLocker
          ? `casier:${request.numLocker} ${request.text}`
          : request.text;
        break;
      case 'SMS':
      default:
        requestType = 'Autre';
        requestType2 = request.type;
        typeCode = 'sms';
        detail = request.text;
        addition = request.text;
        break;
    }

    const requestRef = [
      site.code,
      moment().format('DDMMYYYY'),
      typeCode,
      requestNum,
    ]
      .join('_')
      .replace(/\s/g, '_');

    await this.ecl.query(
      'INSERT INTO `demande`(`de_re_03_u`, `de_re_01_u`, `de_re_02_u`, `de_re_04_u`, ' +
        '`de_re_05_u`, `de_re_06_u`, `de_re_07_u`, `de_re_08_u`, `de_re_09_u`, ' +
        '`de_re_10_u`, `de_re_14`, `id_re_04`, `de_ca_01_u`) ' +
        "VALUES(:requestRef, :date, :time, :trigram, 'Demande en cours de traitement', :requestType, :requestType2, :detail, :addition, 1, 0, :userId, :numLocker)",
      {
        type: Sequelize.QueryTypes.INSERT,
        replacements: {
          requestType,
          requestType2,
          detail,
          addition,
          requestRef,
          date: moment().format('YYYY-MM-DD'),
          time: moment().format('HH:mm:ss'),
          trigram: Ecl.getTrigrammeConcierge(concierges),
          userId: user.id,
          numLocker: request.numLocker || '',
        },
      },
    );

    return requestRef;
  }

  async updateRequest(requestRef: string, request: Request) {
    function addNumLocker(field: any, numLocker: any) {
      return `\`${field}\`=CONCAT('casier:${numLocker || ''} ', \`${field}\`)`;
    }
    function addDetails(field: any, paramName: any) {
      return `\`${field}\`=CONCAT(\`${field}\`, ' ', ${paramName})`;
    }
    // Update num locker if added in request details
    if (request.numLocker) {
      await this.ecl.query(
        'UPDATE `demande` SET ' +
          `${addNumLocker('de_re_08_u', request.numLocker)}, ` +
          `${addNumLocker('de_re_09_u', request.numLocker)}, ` +
          "`de_re_06_u`='Demande casier', " +
          "`de_re_07_u`='casier', " +
          '`de_ca_01_u`=:numLocker ' +
          'WHERE `de_re_03_u`=:requestRef',
        {
          type: Sequelize.QueryTypes.UPDATE,
          replacements: {
            requestRef,
            numLocker: request.numLocker,
          },
        },
      );
    }
    // Add request details
    return this.ecl.query(
      'UPDATE `demande` SET ' +
        `${addDetails('de_re_08_u', ':details')}, ` +
        `${addDetails('de_re_09_u', ':details')} ` +
        'WHERE `de_re_03_u`=:requestRef',
      {
        type: Sequelize.QueryTypes.UPDATE,
        replacements: {
          requestRef,
          details: request.text,
        },
      },
    );
  }

  async getSiteUsers(sites: string[]) {
    const whereIn = `'${sites.join("','")}'`;

    return this.ecl.query(
      'SELECT DISTINCT (u.`id_co_06_u`) AS tel, c.twilio AS twilio ' +
        'FROM `utilisateur` AS u ' +
        'INNER JOIN `client` AS c ON c.`id_re_03` = u.`id_re_03` ' +
        'WHERE u.`id_re_03` IN ' +
        `(${whereIn}) ` +
        "AND u.`id_co_06_u` != '' " +
        'AND u.`id_co_06_u` IS NOT NULL ' +
        "AND (u.`id_ge_02` = '0000-00-00' OR u.`id_ge_02` IS NULL);",
      {
        type: Sequelize.QueryTypes.SELECT,
      },
    );
  }
}
