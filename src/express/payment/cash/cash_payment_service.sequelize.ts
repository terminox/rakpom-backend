import { Sequelize } from 'sequelize'
import { ulid } from 'ulid'

import Shop from '../../../sequelize/models/shop'
import PendingTransaction from '../../../sequelize/models/transaction'

export default class SequelizeCashPaymentService {
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async submitCashPayment(payload: CashPaymentPayload): Promise<CashPaymentResponse> {
    const shop = await Shop.findOne({ where: { shopCode: payload.shopCode } })

    if (shop == null) {
      throw new Error('Invalid shop code')
    }

    const payment = await PendingTransaction.create({
      id: ulid(),
      userID: payload.userID,
      shopID: shop.id,
      amount: -payload.amount,
      type: 'cash'
    })

    return {
      id: payment.id,
      userID: payment.userID,
      shopID: payment.shopID,
      amount: payment.amount,
      type: payment.type
    }
  }
}

type CashPaymentPayload = {
  userID: string
  shopCode: string
  amount: number
}

type CashPaymentResponse = {
  id: string
  userID: string
  shopID: string
  amount: number
  type: string
}