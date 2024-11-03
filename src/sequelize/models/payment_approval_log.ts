import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize'

import sequelize from '..'

class PaymentApprovalLog extends Model<InferAttributes<PaymentApprovalLog>, InferCreationAttributes<PaymentApprovalLog>> {
  declare id: string
  declare paymentLogID: string
  declare status: string
}

PaymentApprovalLog.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    unique: true,
  },
  paymentLogID: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    references: {
      model: 'PaymentLogs',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('approved', 'rejected'),
    allowNull: false,
  }
}, {
  sequelize,
  modelName: 'PaymentApprovalLog',
})

export default PaymentApprovalLog
