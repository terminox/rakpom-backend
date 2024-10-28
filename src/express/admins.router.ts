import { Router, Request, Response } from 'express'

import sequelize from '../sequelize'
import response from '../shared/response_object'

import SequelizePendingTransactionListFetchingService from './admins/transactions/transaction_list_fetching_service.sequelize'
import SequelizePaymentApprovalService from './admins/payment_approval_logs/payment_approval_service.sequelize'

const router = Router()

router.get('/transactions/pending', async (req: Request, res: Response) => {
  try {
    const service = new SequelizePendingTransactionListFetchingService(sequelize)
    const result = await service.fetchPendingTransactions()
    res.status(200).json(response(result))
  } catch (err) {
    res.status(400).json(response(null, err as Error))
  }
})

router.get('/transaction/approved', (req: Request, res: Response) => {
  // TODO
})

// Endpoint for approving or rejecting pending payment items
router.post('/payment-payment-logs', async (req: Request, res: Response) => {
  try {
    const paymentLogID = req.body.paymentLogID
    const action = req.body.action
    const service = new SequelizePaymentApprovalService(sequelize)
    const result = await service.createApprovalLog({ paymentLogID, action })
    res.status(200).json(response(result))
  } catch (err) {
    res.status(400).json(response(null, err as Error))
  }
})

export default router
