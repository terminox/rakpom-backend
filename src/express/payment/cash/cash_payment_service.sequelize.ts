import { Sequelize } from 'sequelize'

export default class SequelizeCashPaymentService {
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async submitCashPayment(payload: CashPaymentPayload) {
    
  }
}

type CashPaymentPayload = {
  userID: string
  shopCode: string
  amount: number
}