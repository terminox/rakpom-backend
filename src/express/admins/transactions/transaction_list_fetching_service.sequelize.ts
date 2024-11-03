import { Sequelize, Op } from 'sequelize'

import PaymentLog from '../../../sequelize/models/payment_log'
import PaymentApprovalLog from '../../../sequelize/models/payment_approval_log'

export default class SequelizeTransactionListFetchingService {
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async fetchPendingTransactions(): Promise<PaymentLog[]> {
    return await PaymentLog.findAll({
      where: {
        id: {
          [Op.notIn]: this.sequelize.literal(
            '(SELECT "paymentLogID" FROM "PaymentApprovalLogs")'
          )
        }
      }
    })
  }
}
