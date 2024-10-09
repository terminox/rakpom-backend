import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ModelDefined } from 'sequelize'

import sequelize from '..'

// import ShopCoordinatesItem from './shop_coordinates_item'

class Shop extends Model<InferAttributes<Shop>, InferCreationAttributes<Shop>> {
  declare id: string
  declare shopName: CreationOptional<string>
  declare shopOwnerName: CreationOptional<string>
  declare shopCode: CreationOptional<string>
  // declare coordinates: CreationOptional<string>
  // declare coordinatesItemID: CreationOptional<string>
  declare phone: CreationOptional<string>
  declare bankName: CreationOptional<string>
  declare bankAccountNumber: CreationOptional<string>
  // declare operatingDays: CreationOptional<string>
  // declare operatingHours: CreationOptional<string>
  declare juniorPriceTHB: CreationOptional<number>
  declare seniorPriceTHB: CreationOptional<number>
  declare coverImageURL: CreationOptional<string>
  declare thumbnailImageURL: CreationOptional<string>
  declare address: CreationOptional<string>
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
  },
  shopOwnerName: {
    type: DataTypes.STRING,
  },
  shopCode: {
    type: DataTypes.STRING,
  },
  // coordinatesItemID: {
  //   type: DataTypes.STRING,
  //   references: {
  //     model: ShopCoordinatesItem,
  //     key: 'id',
  //   }
  // },
  phone: {
    type: DataTypes.STRING,
  },
  bankName: {
    type: DataTypes.STRING,
  },
  bankAccountNumber: {
    type: DataTypes.STRING,
  },
  // operatingDays: {
  //   type: DataTypes.STRING,
  // },
  // operatingHours: {
  //   type: DataTypes.STRING,
  // },
  juniorPriceTHB: {
    type: DataTypes.INTEGER,
  },
  seniorPriceTHB: {
    type: DataTypes.INTEGER,
  },
  // shopImages: {
  //   type: DataTypes.STRING,
  // },
  // hairStyleImages: {
  //   type: DataTypes.STRING,
  // },
  coverImageURL: {
    type: DataTypes.STRING,
  },
  thumbnailImageURL: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
}, {
  sequelize,
  modelName: 'Shop',
})

export default Shop
