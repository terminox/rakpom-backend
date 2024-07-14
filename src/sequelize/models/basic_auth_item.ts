import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'

import sequelize from '..'
import UserProfile from './user_profile'

class BasicAuthItem extends Model<InferAttributes<BasicAuthItem>, InferCreationAttributes<BasicAuthItem>> {
  declare id: string
  declare email: string
  declare hash: string
  declare salt: string
  declare userProfileID: string
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
  userProfileID: {
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
  foreignKey: 'userProfileID',
})

export default BasicAuthItem