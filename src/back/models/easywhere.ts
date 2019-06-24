import { Sequelize } from 'sequelize';

import config from '../config';

const isDev = process.env.NODE_ENV === 'development';

const easywhere = new Sequelize(
  config.DB.easywhere.database,
  config.DB.easywhere.username,
  config.DB.easywhere.password,
  {
    ...config.DB.easywhere,
    dialect: 'mysql',
    dialectOptions: {
      charset: 'latin1',
    },
    logging: isDev,
  },
);

export interface CompoPanier {
  title: string;
  price: string;
  desc: string;
}

export default class EasyWhere {
  easywhere: Sequelize;

  constructor() {
    this.easywhere = easywhere;
  }

  async getInfosPanier(
    name: string,
    siteId: string,
  ): Promise<CompoPanier[] | null> {
    const panier: CompoPanier[] = await this.easywhere.query(
      'SELECT p.title AS title, pc.price AS price, pc.description AS `desc` ' +
        'FROM `Conciergery` c ' +
        'JOIN `ProductConciergery` pc ON c.id = pc.conciergery_id ' +
        'JOIN Product p ON pc.product_id = p.id ' +
        'WHERE LCASE(c.title) = LCASE(:siteId) AND p.type="baskets" AND pc.endDate > NOW() AND REPLACE(LCASE(p.title), " ", "") LIKE REPLACE(LCASE(:panier), " ", "");',
      {
        type: Sequelize.QueryTypes.SELECT,
        replacements: { siteId, panier: `%${name}` },
      },
    );
    return panier;
  }
}
