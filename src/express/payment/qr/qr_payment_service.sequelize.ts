import { Sequelize } from 'sequelize'
import { ulid } from 'ulid'

import Shop from '../../../sequelize/models/shop'
import PaymentLog from '../../../sequelize/models/payment_log'

export default class SequelizeQRPaymentService {
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async submitQRPayment(payload: QRPaymentPayload): Promise<QRPaymentResponse> {
    const shop = await Shop.findOne({ where: { shopCode: payload.shopCode } })

    if (shop == null) {
      throw new Error('Invalid shop code')
    }

    const payment = await PaymentLog.create({
      id: ulid(),
      userID: payload.userID,
      shopID: shop.id,
      amount: payload.amount,
      imageURL: payload.imageURL,
      type: 'qr'
    })

    return {
      id: payment.id,
      userID: payment.userID,
      shopID: payment.shopID,
      amount: payment.amount,
      type: payment.type,
      imageURL: payment.imageURL
    }
  }
}

type QRPaymentPayload = {
  userID: string
  shopCode: string
  amount: number
  imageURL: string
}

type QRPaymentResponse = {
  id: string
  userID: string
  shopID: string
  amount: number
  type: string
  imageURL: string
}
