import { Sequelize } from 'sequelize'
import { ulid } from 'ulid'

import Transaction from '../../../sequelize/models/transaction'
import Shop from '../../../sequelize/models/shop'
import PaymentLog from '../../../sequelize/models/payment_log'
import PaymentApprovalLog from '../../../sequelize/models/payment_approval_log'
import RecentBookingItem from '../../../sequelize/models/recent_booking_item'

export default class SequelizeCashPaymentService {
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async submitCashPayment(payload: CashPaymentPayload) {
    const { userID, shopCode, amount } = payload

    return this.sequelize.transaction(async (t) => {
      // 1. Find shop by code
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
        amount: -amount,
        type: 'cash',
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
        amount: -amount,
        note: 'cash'
      }, { transaction: t })

      // 5. Create recent booking item
      await RecentBookingItem.create({
        id: ulid(),
        userID,
        shopID: shop.id,
        amount
      }, { transaction: t })
    })
  }
}

type CashPaymentPayload = {
  userID: string
  shopCode: string
  amount: number
}