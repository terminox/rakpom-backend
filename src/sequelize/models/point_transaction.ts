import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'

import sequelize from '..'

class PointTransaction extends Model<InferAttributes<PointTransaction>, InferCreationAttributes<PointTransaction>> {
  declare id: string
  declare value: number
  declare userID: string
  declare createdAt: CreationOptional<Date>
}

PointTransaction.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
  },
  value: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userID: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'UserProfiles',
      key: 'id'
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'PointTransaction',
})

export default PointTransaction
