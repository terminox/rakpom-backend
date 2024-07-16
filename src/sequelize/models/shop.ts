import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ModelDefined } from 'sequelize'

import sequelize from '..'

import ShopCoordinatesItem from './shop_coordinates_item'

class Shop extends Model<InferAttributes<Shop>, InferCreationAttributes<Shop>> {
  declare id: string
  declare shopName: string
  declare shopOwnerName: string
  // declare coordinates: CreationOptional<string>
  declare coordinatesItemID: CreationOptional<string>
  declare phone: string
  declare bankName: string
  declare bankAccountNumber: string
  // declare operatingDays: CreationOptional<string>
  // declare operatingHours: CreationOptional<string>
  declare juniorPriceTHB: number
  declare seniorPriceTHB: number
  // declare shopImages: CreationOptional<string>
  // declare hairStyleImages: CreationOptional<string>
}

Shop.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
  },
  shopName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shopOwnerName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  coordinatesItemID: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bankName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  bankAccountNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // operatingDays: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  // operatingHours: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  juniorPriceTHB: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  seniorPriceTHB: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // shopImages: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
  // hairStyleImages: {
  //   type: DataTypes.STRING,
  //   allowNull: false,
  // },
}, {
  sequelize,
  modelName: 'Shop',
})

Shop.hasOne(ShopCoordinatesItem, {
  foreignKey: 'shopID',
  as: 'coordinatesItem',
})

ShopCoordinatesItem.belongsTo(Shop, {
  foreignKey: 'shopID',
  as: 'shop',
})

export default Shop
