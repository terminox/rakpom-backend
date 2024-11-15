import { Sequelize } from 'sequelize'
import { ulid } from 'ulid'

import PaymentApprovalLog from '../../../sequelize/models/payment_approval_log'

export default class SequelizePaymentRejectionService {
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async createLog(payload: PaymentRejectionPayload): Promise<PaymentRejectionResponse> {
    const approvalLog = await PaymentApprovalLog.create({
      id: ulid(),
      paymentLogID: payload.paymentLogID,
      status: 'rejected'
    })

    return {
      id: approvalLog.id,
      paymentLogID: approvalLog.paymentLogID,
      status: approvalLog.status
    }
  }
}

type PaymentRejectionPayload = {
  paymentLogID: string
}

type PaymentRejectionResponse = {
  id: string
  paymentLogID: string 
  status: string
}
