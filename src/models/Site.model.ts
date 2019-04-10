import {
  Sequelize,
  Table,
  Column,
  ForeignKey,
  HasMany,
  BelongsTo,
  Model,
} from 'sequelize-typescript';
import BaseModel from './BaseModel.model';
import SiteOrService from './SiteOrService.model';
import { fields, field } from '../utils/model.util';
import Filiale from './Filiale.model';


@Table({
  tableName: 'Site',
  modelName: 'Site',
})
class Site extends BaseModel<Site> {
  static checkCode(siteCode: string) {
    return siteCode.length === 4;
  }
  static async getFiliale(siteCode: string) {
    const queryRes = await SiteOrService.findOne({
      attributes: [],
      include: [
        {
          model: Site,
          attributes: [],
          required: true,
        },
        {
          model: Filiale,
          attributes: [field<Filiale>('Nom')],
        },
      ],
      where: fields<SiteOrService>({
        Code: siteCode,
      }),
    });
    return queryRes ? queryRes.Filiale.Nom : null;
  }
  static async getNomSite(siteCode: string) {
    const queryRes = await SiteOrService.findOne({
      attributes: [field<SiteOrService>('Libelle')],
      include: [
        {
          model: Site,
          attributes: [],
          required: true,
        }
      ],
      where: fields<SiteOrService>({
        Code: siteCode,
      }),
    });
    return queryRes ? queryRes.Libelle : null;
  }
  @ForeignKey(() => SiteOrService)
  @Column({
    type: Sequelize.INTEGER,
    allowNull: false,
  })
  IdSiteOrService: number;

  @BelongsTo(() => SiteOrService)
  SiteOrService: SiteOrService;
}

export default Site;
