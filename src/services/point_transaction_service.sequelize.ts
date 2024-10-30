import { Sequelize } from 'sequelize'
import { ulid } from 'ulid'

import PointTransaction from '../sequelize/models/point_transaction'
import PaymentLog from '../sequelize/models/payment_log'

export default class SequelizePointTransactionService {
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async createPointTransaction(paymentLogID: string): Promise<void> {
    const paymentLog = await PaymentLog.findByPk(paymentLogID)
    if (!paymentLog) {
      throw new Error('Payment log not found')
    }

    const pointValue = Math.floor(paymentLog.amount / 10)
    await PointTransaction.create({
      id: ulid(),
      value: pointValue,
      userID: paymentLog.userID
    })
  }
}