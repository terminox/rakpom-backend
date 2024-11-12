import { Router, Request, Response } from 'express'

import sequelize from '../sequelize'
import response from '../shared/response_object'

import SequelizePendingTransactionListFetchingService from './admins/transactions/transaction_list_fetching_service.sequelize'
import SequelizePaymentApprovalService from './admins/payment_approval_logs/payment_approval_service.sequelize'
import SequelizePointTransactionService from '../services/point_transaction_service.sequelize'
import SequelizeRecentBookingService from '../services/recent_booking_service.sequelize'
import SequelizeUserFetchingService from '../services/user_fetching_service.sequelize'

const router = Router()

router.get('/users', async (req: Request, res: Response) => {
  try {
    const service = new SequelizeUserFetchingService(sequelize)
    const users = await service.fetchAllUsers()
    res.status(200).json(response(users))
  } catch (err) {
    res.status(400).json(response(null, err as Error))
  }
})

router.get('/shops', async (req: Request, res: Response) => {
  // TODO
})

router.get('/transactions/pending', async (req: Request, res: Response) => {
  try {
    const service = new SequelizePendingTransactionListFetchingService(sequelize)
    const result = await service.fetchPendingTransactions()
    res.status(200).json(response(result))
  } catch (err) {
    res.status(400).json(response(null, err as Error))
  }
})

// Endpoint for approving or rejecting pending payment items
router.post('/payment-approval-logs', async (req: Request, res: Response) => {
  try {
    const paymentLogID = req.body.paymentLogID
    const action = req.body.action
    const service = new SequelizePaymentApprovalService(sequelize)
    const result = await service.createApprovalLog({ paymentLogID, action })

    if (action === 'approve') {
      const pointService = new SequelizePointTransactionService(sequelize)
      await pointService.createPointTransaction(paymentLogID)

      const recentBookingService = new SequelizeRecentBookingService(sequelize)
      await recentBookingService.createRecentBookingItem(paymentLogID)
    }

    res.status(200).json(response(result))
  } catch (err) {
    res.status(400).json(response(null, err as Error))
  }
})

export default router
