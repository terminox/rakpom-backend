import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ModelDefined } from 'sequelize'

import sequelize from '..'

import UserProfile from './user_profile'

class Transaction extends Model<InferAttributes<Transaction>, InferCreationAttributes<Transaction>> {
  declare id: string
  declare userID: string
  declare shopID: string
  declare amount: number
  declare note: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

Transaction.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
  },
  userID: {
    type: DataTypes.STRING,
    references: {
      model: UserProfile,
      key: 'id',
    }
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
  modelName: 'Transaction',
})

Transaction.belongsTo(UserProfile, {
  foreignKey: 'userID',
  targetKey: 'id'
})

export default Transaction
