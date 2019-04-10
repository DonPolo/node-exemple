import {
  Sequelize,
  Table,
  Column,
  ForeignKey,
  HasOne,
  BelongsToMany,
  BelongsTo,
} from 'sequelize-typescript';
import Filiale from './Filiale.model';
import Site from './Site.model';
import BaseModel from './BaseModel.model';

@Table({
  tableName: 'SiteOrService',
  modelName: 'SiteOrService',
})
class SiteOrService extends BaseModel<SiteOrService> {
  @Column({
    type: Sequelize.STRING,
    allowNull: false,
  })
  Code: string;

  @Column({
    type: Sequelize.STRING,
    allowNull: false,
  })
  Libelle: string;

  @ForeignKey(() => Filiale)
  @Column({
    type: Sequelize.INTEGER,
    allowNull: false,
  })
  IdFiliale: number;

  @BelongsTo(() => Filiale)
  Filiale: Filiale;

  @HasOne(() => Site)
  Site: Site;
}

export default SiteOrService;
