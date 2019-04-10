import { Sequelize, ISequelizeConfig } from 'sequelize-typescript';

import logger from '../config/logger';
import config from '../config';

import Filiale from './Filiale.model';

import Site from './Site.model';
import SiteOrService from './SiteOrService.model';

const options: ISequelizeConfig = config.DB;
// Add it in DB options only when false, do not put true
if (!config.DB_LOGGING) options.logging = false;
else logger.debug('Sequelize log enabled');
logger.debug('Sequelize config', options);
const sequelize = new Sequelize(options);

sequelize.addModels([Filiale, Site, SiteOrService]);

export default sequelize;
