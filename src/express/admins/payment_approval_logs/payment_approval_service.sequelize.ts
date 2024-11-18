import { Sequelize, Transaction as SequelizeTransaction } from 'sequelize'
import { ulid } from 'ulid'

import PaymentApprovalLog from '../../../sequelize/models/payment_approval_log'
import PaymentLog from '../../../sequelize/models/payment_log'
import Transaction from '../../../sequelize/models/transaction'

export default class SequelizePaymentApprovalService {
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async createApprovalLog(payload: PaymentApprovalPayload): Promise<PaymentApprovalResponse> {
    return this.sequelize.transaction(async (t: SequelizeTransaction) => {
      const approvalLog = await PaymentApprovalLog.create({
        id: ulid(),
        paymentLogID: payload.paymentLogID,
        status: 'approved'
      }, { transaction: t })

      const paymentLog = await PaymentLog.findByPk(payload.paymentLogID, { transaction: t })
      if (!paymentLog) {
        throw new Error('Payment log not found')
      }

      if (paymentLog.type !== 'qr') {
        throw new Error('Only QR payments can be approved')
      }

      await Transaction.create({
        id: ulid(),
        userID: paymentLog.userID,
        shopID: paymentLog.shopID,
        amount: paymentLog.amount,
        note: paymentLog.type,
      }, { transaction: t })

      return {
        id: approvalLog.id,
        paymentLogID: approvalLog.paymentLogID,
        status: approvalLog.status,
        amount: paymentLog.amount
      }
    })
  }
}

type PaymentApprovalPayload = {
  paymentLogID: string
}

type PaymentApprovalResponse = {
  id: string
  paymentLogID: string 
  status: string
  amount: number
}
