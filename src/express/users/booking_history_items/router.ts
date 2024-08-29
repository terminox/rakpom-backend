import { Request, Response } from 'express'

import Controller from './controller'
import SequelizeBookingHistoryFetchingService from './list_fetching_service.sequelize'

import sequelize from '../../../sequelize'
import response from '../../../shared/response_object'

export default class Router {
  
  private controller: Controller 

  constructor(controller: Controller) {
    this.controller = controller
  }
  
  async handle(req: Request, res: Response) {
    try {
      const offset: number = parseInt(req.query.offset as string)
      const limit: number = parseInt(req.query.limit as string)
      const notifications = await this.controller.getBookingHistory(offset, limit)
      res.status(200).json(response(notifications))
    } catch (err) {
      res.status(400).json(response(null, err as Error))
    }
  }

  static makeDefaultRouter(): Router {
    const service = new SequelizeBookingHistoryFetchingService(sequelize)
    const controller = new Controller(service)
    return new Router(controller)
  }
}
