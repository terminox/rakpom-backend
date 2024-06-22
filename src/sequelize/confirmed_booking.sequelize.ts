import { Model, DataTypes } from 'sequelize'

import sequelize from './sequelize'

class ConfirmedBooking extends Model {}

ConfirmedBooking.init({
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
  modelName: 'ConfirmedBooking'
})

export default ConfirmedBooking
