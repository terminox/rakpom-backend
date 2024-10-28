import { Sequelize } from 'sequelize'
import { ulid } from 'ulid'
import PaymentApprovalLog from '../../../sequelize/models/payment_approval_log'

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

type PaymentApprovalPayload = {
  paymentLogID: string
  action: 'approve' | 'reject'
}

type PaymentApprovalResponse = {
  id: string
  paymentLogID: string 
  status: string
}
