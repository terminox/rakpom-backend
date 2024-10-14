import { Router, Request, Response } from 'express'

import sequelize from '../sequelize'
import response from '../shared/response_object'

import SequelizePendingTransactionListFetchingService from './admins/transactions/transaction_list_fetching_service.sequelize'

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

export default router
