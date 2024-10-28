import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ModelDefined } from 'sequelize'

import sequelize from '..'

class PaymentLog extends Model<InferAttributes<PaymentLog>, InferCreationAttributes<PaymentLog>> {
  declare id: string
  declare userID: string
  declare shopID: string
  declare amount: number
  declare type: string
}

PaymentLog.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
  },
  userID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shopID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('cash', 'qr', 'point'),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'PaymentLog',
})

export default PaymentLog
