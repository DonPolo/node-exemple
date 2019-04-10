import { Sequelize, Table, Column, Model } from 'sequelize-typescript';
import { Transaction } from 'sequelize';
import { fields } from '../utils/model.util';
import APIError from '../utils/error/apierror.util';

@Table({
  tableName: 'Filiale',
  modelName: 'Filiale',
})
class Filiale extends Model<Filiale> {
  /**
   * Returns infos for entity with given id or throw an error
   */
  /*static async getInfos(entityId: number, transaction?: Transaction) {
    const result = await DonneesFiliale.findOne({
      transaction,
      where: fields<DonneesFiliale>({ IdFiliale: entityId }),
    });
    if (!result) throw new APIError(`Missing infos for entity ${entityId}`);
    return result;
  }*/

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
  Nom: string;

  @Column({
    type: Sequelize.INTEGER,
    allowNull: false,
  })
  NumeroCompte: number;
}

export default Filiale;
