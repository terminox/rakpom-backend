import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize'

import sequelize from '..'

import UserProfile from './user_profile'
import Shop from './shop'

class BookingRequest extends Model<InferAttributes<BookingRequest>, InferCreationAttributes<BookingRequest>> {
  declare id: string
  declare userID: string
  declare shopID: string
  declare date: Date
  declare startHour: number
  declare startMinute: number
  declare endHour: number
  declare endMinute: number
  declare status: string
}

BookingRequest.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
  },
  userID: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: UserProfile,
      key: 'id',
    }
  },
  shopID: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: Shop,
      key: 'id',
    }
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  startHour: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  startMinute: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  endHour: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  endMinute: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'rejected'),
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'BookingRequest'
})

BookingRequest.belongsTo(UserProfile, {
  foreignKey: 'userID',
  targetKey: 'id'
})

BookingRequest.belongsTo(Shop, {
  foreignKey: 'shopID',
  targetKey: 'id'
})

export default BookingRequest
