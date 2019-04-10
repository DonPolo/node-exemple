import {
  Sequelize,
  Column,
  Model,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
} from 'sequelize-typescript';

import BaseCompteUtilisateur from './BaseCompteUtilisateur.model';

class BaseModel<T> extends Model<BaseModel<T>> {
  @Column({
    field: 'Id',
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => BaseCompteUtilisateur)
  @Column({
    type: Sequelize.INTEGER,
    allowNull: true,
  })
  IdCreatedUser: number | null;

  @CreatedAt
  @Column({
    type: Sequelize.DATE,
    allowNull: false,
  })
  CreatedDate: Date;

  @ForeignKey(() => BaseCompteUtilisateur)
  @Column({
    type: Sequelize.INTEGER,
    allowNull: true,
  })
  IdUpdatedUser: number | null;

  @UpdatedAt
  @Column({
    type: Sequelize.DATE,
    allowNull: true,
  })
  UpdatedDate: Date | null;

  @DeletedAt
  @Column({
    type: Sequelize.DATE,
    allowNull: true,
  })
  DeletedDate: Date | null;
}

export default BaseModel;
