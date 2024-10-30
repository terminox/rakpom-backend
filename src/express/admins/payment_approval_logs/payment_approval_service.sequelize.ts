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
    let status: string
    switch (payload.action) {
      case 'approve':
        status = 'approved'
        break
      case 'reject':
        status = 'rejected'
        break
    }

    if (payload.action === 'approve') {
      return this.sequelize.transaction(async (t: SequelizeTransaction) => {
        const approvalLog = await PaymentApprovalLog.create({
          id: ulid(),
          paymentLogID: payload.paymentLogID,
          status
        }, { transaction: t })

        const paymentLog = await PaymentLog.findByPk(payload.paymentLogID, { transaction: t })
        if (!paymentLog) {
          throw new Error('Payment log not found')
        }

        await Transaction.create({
          id: ulid(),
          shopID: paymentLog.shopID,
          amount: paymentLog.amount,
          note: paymentLog.type,
        }, { transaction: t })

        return {
          id: approvalLog.id,
          paymentLogID: approvalLog.paymentLogID,
          status: approvalLog.status
        }
      })
    } else {
      const approvalLog = await PaymentApprovalLog.create({
        id: ulid(),
        paymentLogID: payload.paymentLogID,
        status
      })

      return {
        id: approvalLog.id,
        paymentLogID: approvalLog.paymentLogID,
        status: approvalLog.status
      }
    }
  }
}

type PaymentApprovalPayload = {
  paymentLogID: string
  action: 'approve' | 'reject'
}

type PaymentApprovalResponse = {
  id: string
  paymentLogID: string 
  status: string
}
