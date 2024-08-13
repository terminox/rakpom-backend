import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize'

import sequelize from '..'

import UserProfile from './user_profile'
import Shop from './shop'

class BasicAuthItem extends Model<InferAttributes<BasicAuthItem>, InferCreationAttributes<BasicAuthItem>> {
  declare id: string
  declare email: string
  declare hash: string
  declare salt: string
  declare authorizableID: string
}

BasicAuthItem.init({
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    },
  },
  hash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salt: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  authorizableID: {
    type: DataTypes.STRING,
    allowNull: false,
  } 
}, {
  sequelize,
  modelName: 'BasicAuthItem',
  indexes: [
    {
      unique: true,
      fields: ['email']
    },
  ]
})

BasicAuthItem.belongsTo(UserProfile, {
  foreignKey: 'authorizableID',
})

BasicAuthItem.belongsTo(Shop, {
  foreignKey: 'authorizableID',
})

export default BasicAuthItem