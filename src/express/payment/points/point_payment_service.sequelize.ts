import { Sequelize } from 'sequelize'
import { ulid } from 'ulid'

import Transaction from '../../../sequelize/models/transaction'
import Shop from '../../../sequelize/models/shop'
import PaymentLog from '../../../sequelize/models/payment_log'
import PaymentApprovalLog from '../../../sequelize/models/payment_approval_log'
import PointTransaction from '../../../sequelize/models/point_transaction'
import RecentBookingItem from '../../../sequelize/models/recent_booking_item'

class SequelizePointPaymentService {
  constructor(private sequelize: Sequelize) {}

  async submitPointPayment({ userID, shopCode, amount }: { userID: string, shopCode: string, amount: number }) {
    return this.sequelize.transaction(async (t) => {
      // 1. Check user points balance
      const pointTransactions = await PointTransaction.findAll({ where: { userID }, transaction: t })
      const totalPoints = pointTransactions.reduce((acc, curr) => acc + curr.value, 0)
      if (totalPoints < amount) {
        throw new Error('Insufficient points balance')
      }

      // Find shop by code
      const shop = await Shop.findOne({ where: { shopCode }, transaction: t })
      if (!shop) {
        throw new Error('Shop not found') 
      }

      // 2. Create payment log
      const paymentLogID = ulid()
      await PaymentLog.create({
        id: paymentLogID,
        userID,
        shopID: shop.id,
        amount,
        type: 'point',
      }, { transaction: t })

      // 3. Create approval log
      await PaymentApprovalLog.create({
        id: ulid(),
        paymentLogID,
        status: 'approved'
      }, { transaction: t })

      // 4. Create transaction
      await Transaction.create({
        id: ulid(),
        userID,
        shopID: shop.id,
        amount,
        note: 'point'
      }, { transaction: t })

      // 5. Create point transaction with negative amount
      await PointTransaction.create({
        id: ulid(),
        userID,
        value: -amount,
      }, { transaction: t })

      // 6. Create recent booking item
      await RecentBookingItem.create({
        id: ulid(),
        userID,
        shopID: shop.id,
        amount
      }, { transaction: t })
    })
  }
}

export default SequelizePointPaymentService 