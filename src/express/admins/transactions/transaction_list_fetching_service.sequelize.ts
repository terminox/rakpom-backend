import { Sequelize } from 'sequelize'

import PendingTransaction from '../../../sequelize/models/pending_payment_item'

export default class SequelizeTransactionListFetchingService {
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async fetchPendingTransactions(): Promise<PendingTransaction[]> {
    return await PendingTransaction.findAll({})
  }
}
