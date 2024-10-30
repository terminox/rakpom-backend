import { Sequelize } from 'sequelize'
import { ulid } from 'ulid'

import PaymentLog from '../sequelize/models/payment_log'
import RecentBookingItem from '../sequelize/models/recent_booking_item'

export default class SequelizeRecentBookingService {
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async createRecentBookingItem(paymentLogID: string): Promise<void> {
    const paymentLog = await PaymentLog.findByPk(paymentLogID)
    if (!paymentLog) {
      throw new Error('Payment log not found')
    }

    await RecentBookingItem.create({
      id: ulid(),
      userID: paymentLog.userID,
      shopID: paymentLog.shopID,
    })
  }
}
