import { Sequelize } from 'sequelize'

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
    // TODO: Implement actual balance calculation from database
    return [
      {
        title: "ยอดในระบบ",
        value: "120.00",
        style: "BOLD"
      },
      {
        title: "ยอดชำระสแกนจ่าย",
        value: "+100.00",
        style: "POSITIVE"
      },
      {
        title: "ยอดชำระเงินสด",
        value: "-20.00",
        style: "NEGATIVE"
      },
      {
        title: "ยอดคอมมิชชั่น",
        value: "10%",
        style: "BOLD"
      },
      {
        title: "ภาษีมูลค่าเพิ่ม",
        value: "7%",
        style: "BOLD"
      },
      {
        title: "ยอดที่ถอนได้",
        value: "0",
        style: "NEGATIVE"
      }
    ]
  }
} 