import { Sequelize } from 'sequelize'

import WithdrawRequestLog from '../../../sequelize/models/withdraw_request_log'

export default class SequelizeWithdrawRequestFetchingService {
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async fetchWithdrawRequests(shopID: string): Promise<WithdrawRequestItem[]> {
    const withdrawRequests = await WithdrawRequestLog.findAll({
      where: { shopID },
      order: [['createdAt', 'DESC']]
    })

    return withdrawRequests.map(request => ({
      title: 'ถอนเงิน',
      dateString: request.createdAt.toLocaleString('th-TH', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }),
      formattedAmount: `฿${request.amount.toFixed(2)}`
    }))
  }
}

export type WithdrawRequestItem = {
  title: string
  dateString: string
  formattedAmount: string
} 