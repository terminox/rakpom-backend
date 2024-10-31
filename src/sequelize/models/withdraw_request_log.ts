import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import sequelize from '..'
import Shop from './shop'

class WithdrawRequestLog extends Model<InferAttributes<WithdrawRequestLog>, InferCreationAttributes<WithdrawRequestLog>> {
  declare id: string
  declare shopID: string
  declare amount: number
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

WithdrawRequestLog.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
  },
  shopID: {
    type: DataTypes.STRING,
    references: {
      model: Shop,
      key: 'id',
    },
    allowNull: false
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'WithdrawRequestLog',
})

// Set up association with Shop model
WithdrawRequestLog.belongsTo(Shop, {
  foreignKey: 'shopID',
  as: 'shop'
})

export default WithdrawRequestLog 