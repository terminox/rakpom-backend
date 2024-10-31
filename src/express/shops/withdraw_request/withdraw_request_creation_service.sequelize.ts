import { Sequelize } from 'sequelize'
import { ulid } from 'ulid'

import WithdrawRequestLog from '../../../sequelize/models/withdraw_request_log'
import Transaction from '../../../sequelize/models/transaction'

export default class SequelizeWithdrawRequestCreationService {
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async createWithdrawRequest(payload: CreateWithdrawRequestPayload): Promise<WithdrawRequestResult> {
    const { shopID } = payload

    // Calculate total balance and withdrawable amount
    const totalAmount = await Transaction.sum('amount', { where: { shopID } })
    const withdrawableAmount = totalAmount * 0.9 * 0.93 // After commission and VAT

    // Validate there is amount to withdraw
    if (!withdrawableAmount || withdrawableAmount <= 0) {
      throw new Error('No balance available for withdrawal')
    }

    // Create withdraw request
    const withdrawRequest = await WithdrawRequestLog.create({
      id: ulid(),
      shopID,
      amount: withdrawableAmount
    })

    return {
      id: withdrawRequest.id,
      amount: withdrawRequest.amount,
      createdAt: withdrawRequest.createdAt
    }
  }
}

export type CreateWithdrawRequestPayload = {
  shopID: string
}

export type WithdrawRequestResult = {
  id: string
  amount: number
  createdAt: Date
} 