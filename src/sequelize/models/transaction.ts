import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ModelDefined } from 'sequelize'

import sequelize from '..'

class Transaction extends Model<InferAttributes<Transaction>, InferCreationAttributes<Transaction>> {
  declare id: string
  declare shopID: string
  declare amount: number
  declare note: string
}

Transaction.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
  },
  shopID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'Transaction',
})

export default Transaction
