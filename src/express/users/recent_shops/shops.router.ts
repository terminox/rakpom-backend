import { Request, Response } from 'express'

import UserShopsController from './shops.controller'
import SequelizeRecentShopListFetchingService from './shop_list_fetching_service.sequelize'

import sequelize from '../../../sequelize'
import response from '../../../shared/response_object'

export default class UserShopsRouter {
  
  private controller: UserShopsController 

  constructor(controller: UserShopsController) {
    this.controller = controller
  }
  
  async handle(req: Request, res: Response) {
    try {
      const offset: number = parseInt(req.query.offset as string) || 0
      const limit: number = parseInt(req.query.limit as string) || 3
      const shops = await this.controller.getShops(offset, limit)
      res.status(200).json(response(shops))
    } catch (err) {
      res.status(400).json(response(null, err as Error))
    }
  }

  static makeDefaultRouter(): UserShopsRouter {
    const service = new SequelizeRecentShopListFetchingService(sequelize)
    const controller = new UserShopsController(service)
    return new UserShopsRouter(controller)
  }
}
