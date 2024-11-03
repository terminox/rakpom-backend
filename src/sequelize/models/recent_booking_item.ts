import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize'

import sequelize from '..'
import Shop from './shop'

class RecentBookingItem extends Model<InferAttributes<RecentBookingItem>, InferCreationAttributes<RecentBookingItem>> {
  declare id: string
  declare userID: string
  declare shopID: string
}

RecentBookingItem.init({
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
    references: {
      model: Shop,
      key: 'id'
    }
  }
}, {
  sequelize,
  modelName: 'RecentBookingItem',
})

RecentBookingItem.belongsTo(Shop, {
  foreignKey: 'shopID',
  as: 'Shop'
})

export default RecentBookingItem
