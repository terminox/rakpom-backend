import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize'

import sequelize from '..'

import UserProfile from './user_profile'
import Shop from './shop'

class FirebasePhoneAuthItem extends Model<InferAttributes<FirebasePhoneAuthItem>, InferCreationAttributes<FirebasePhoneAuthItem>> {
  declare id: string
  declare phone: string
  declare authorizableID: string
}

FirebasePhoneAuthItem.init({
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  authorizableID: {
    type: DataTypes.STRING,
    allowNull: false,
  } 
}, {
  sequelize,
  modelName: 'FirebasePhoneAuthItem',
  indexes: [
    {
      unique: true,
      fields: ['email']
    },
  ]
})

FirebasePhoneAuthItem.belongsTo(UserProfile, {
  foreignKey: 'authorizableID',
})

FirebasePhoneAuthItem.belongsTo(Shop, {
  foreignKey: 'authorizableID',
})

export default FirebasePhoneAuthItem
