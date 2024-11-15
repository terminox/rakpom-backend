import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ModelDefined } from 'sequelize'

import sequelize from '..'

class UserProfile extends Model<InferAttributes<UserProfile>, InferCreationAttributes<UserProfile>> {
  declare id: string
  declare email: CreationOptional<string> 
  declare memberID: CreationOptional<number> 
  declare fullName: CreationOptional<string>
  declare gender: CreationOptional<string>
  declare phoneNumber: CreationOptional<string>
  declare avatarURL: CreationOptional<string>
}

UserProfile.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    validate: {
      isEmail: true
    },
  },
  memberID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
    autoIncrement: true,
  },
  fullName: DataTypes.STRING,
  gender: DataTypes.ENUM('male', 'female'),
  phoneNumber: DataTypes.STRING,
  avatarURL: DataTypes.STRING
}, {
  sequelize,
  modelName: 'UserProfile',
  indexes: [
    {
      unique: true,
      fields: ['email']
    },
    {
      unique: true,
      fields: ['memberID']
    }
  ]
})

export default UserProfile
