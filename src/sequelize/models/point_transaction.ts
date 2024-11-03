import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize'

import sequelize from '..'

class PointTransaction extends Model<InferAttributes<PointTransaction>, InferCreationAttributes<PointTransaction>> {
  declare id: string
  declare value: number
  declare userID: string
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
  }
}, {
  sequelize,
  modelName: 'PointTransaction',
})

export default PointTransaction
