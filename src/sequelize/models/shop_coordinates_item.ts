import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ModelDefined } from 'sequelize'

import sequelize from '..'

class ShopCoordinatesItem extends Model<InferAttributes<ShopCoordinatesItem>, InferCreationAttributes<ShopCoordinatesItem>> {
  declare id: string
  declare shopID: string
  declare latitude: number
  declare longitude: number
}

ShopCoordinatesItem.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
  },
  shopID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
  longitude: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'ShopCoordinatesItem',
})

export default ShopCoordinatesItem
