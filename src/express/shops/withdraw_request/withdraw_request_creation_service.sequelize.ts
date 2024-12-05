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
    const commission = totalAmount * 0.1
    const vat = commission * 0.07
    const withdrawableAmount = totalAmount - commission - vat

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