import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize'

import sequelize from '..'

import BookingRequest from './booking_request'

class BookingRequestAction extends Model<InferAttributes<BookingRequestAction>, InferCreationAttributes<BookingRequestAction>> {
  declare id: string
  declare bookingRequestID: string
  declare action: string
}

BookingRequestAction.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
  },
  bookingRequestID: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: BookingRequest,
      key: 'id',
    }
  },
  action: {
    type: DataTypes.ENUM('accept', 'reject'),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'BookingRequestAction'
})

export default BookingRequestAction
