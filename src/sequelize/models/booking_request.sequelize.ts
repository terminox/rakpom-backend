import { Model, DataTypes } from 'sequelize'

import sequelize from '.'

class BookingRequest extends Model {}

BookingRequest.init({
  userId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shopId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'BookingRequest'
})

export default BookingRequest
