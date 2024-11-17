import { Sequelize } from 'sequelize'
import Transaction from '../../../sequelize/models/transaction'
import UserProfile from '../../../sequelize/models/user_profile'

class TransactionFetchingService {
  constructor(private sequelize: Sequelize) {}

  async fetchAllTransactions(shopID: string): Promise<TransactionDisplayItem[]> {
    try {
      const transactions = await Transaction.findAll({
        where: { shopID },
        order: [['createdAt', 'DESC']],
        include: [{
          model: UserProfile,
          as: 'UserProfile',
          attributes: ['id', 'fullName']
        }]
      })

      const items = transactions.map((transaction) => {
        let title = ''
        switch (transaction.note) {
          case 'cash':
            title = 'รับเงินสด'
            break
          case 'qr':
            title = 'รับโอน'
            break
          case 'point':
            title = 'รับแต้ม'
            break
          default:
            title = 'รายการอื่นๆ'
            break
        }

        const userFullName = (transaction as any).UserProfile.fullName

        return {
          id: transaction.id,
          title,
          description: `จาก ${userFullName}`,
          dateString: transaction.createdAt.toLocaleString('th-TH', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          }),
          amountString: `฿${transaction.amount}`,
        }
      })

      return items
    } catch (error) {
      throw new Error(`Failed to fetch transactions: ${error}`)
    }
  }
}

type TransactionDisplayItem = {
  id: string
  title: string
  description: string
  dateString: string
  amountString: string
}

export default TransactionFetchingService 
