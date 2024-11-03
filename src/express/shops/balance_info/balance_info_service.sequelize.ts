import { Sequelize } from 'sequelize'

import Transaction from '../../../sequelize/models/transaction'

interface BalanceInfoItem {
  title: string
  value: string
  style: 'BOLD' | 'POSITIVE' | 'NEGATIVE'
}

export default class SequelizeBalanceInfoService {
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async fetchBalanceInfo(shopID: string): Promise<BalanceInfoItem[]> {
    const balanceInfo: BalanceInfoItem[] = [
      await this.getTotalBalance(shopID),
      await this.getQRPaymentBalance(shopID),
      await this.getCashPaymentBalance(shopID),
      this.getCommissionRate(),
      this.getVATRate(),
      await this.getWithdrawableBalance(shopID)
    ]

    return balanceInfo
  }

  private async getTotalBalance(shopID: string): Promise<BalanceInfoItem> {
    const totalAmount = await Transaction.sum('amount', { where: { shopID } })
    return {
      title: 'ยอดในระบบ',
      value: totalAmount?.toString() ?? '0',
      style: 'BOLD'
    }
  }

  private async getQRPaymentBalance(shopID: string): Promise<BalanceInfoItem> {
    const totalAmount = await Transaction.sum('amount', { where: { shopID, note: 'qr' } })
    return {
      title: 'ยอดชำระสแกนจ่าย',
      value: totalAmount?.toString() ?? '0',
      style: totalAmount && totalAmount > 0 ? 'POSITIVE' : 'NEGATIVE'
    }
  }

  private async getCashPaymentBalance(shopID: string): Promise<BalanceInfoItem> {
    const totalAmount = await Transaction.sum('amount', { where: { shopID, note: 'cash' } })
    return {
      title: 'ยอดชำระเงินสด',
      value: totalAmount?.toString() ?? '0',
      style: totalAmount && totalAmount > 0 ? 'POSITIVE' : 'NEGATIVE'
    }
  }

  private getCommissionRate(): BalanceInfoItem {
    return {
      title: 'ยอดคอมมิชชั่น',
      value: '10%',
      style: 'BOLD'
    }
  }

  private getVATRate(): BalanceInfoItem {
    return {
      title: 'ภาษีมูลค่าเพิ่ม',
      value: '7%',
      style: 'BOLD'
    }
  }

  private async getWithdrawableBalance(shopID: string): Promise<BalanceInfoItem> {
    const totalAmount = await Transaction.sum('amount', { where: { shopID } })
    const withdrawableAmount = totalAmount * 0.9 * 0.93 
    return {
      title: 'ยอดที่ถอนได้',
      value: withdrawableAmount ? withdrawableAmount.toFixed(2) : '0',
      style: withdrawableAmount > 0 ? 'POSITIVE' : 'NEGATIVE'
    }
  }
} 