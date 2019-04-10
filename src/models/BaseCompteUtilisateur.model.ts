import {
  Sequelize,
  Table,
  Column,
  ForeignKey,
  Model,
  UpdatedAt,
  DeletedAt,
  CreatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'CompteUtilisateur',
  modelName: 'CompteUtilisateur',
})
class BaseCompteUtilisateur<T> extends Model<BaseCompteUtilisateur<T>> {
  @Column({
    field: 'Id',
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: Sequelize.STRING,
    allowNull: false,
  })
  Login: string;

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

export default BaseCompteUtilisateur;
