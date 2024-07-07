import { Request, Response } from 'express'

import UserShopsController from './shops.controller'
import SequelizeShopListFetchingService from './shop_list_fetching_service.sequelize'

import sequelize from '../../sequelize/sequelize'

export default class UserShopsRouter {
  
  private controller: UserShopsController 

  constructor(controller: UserShopsController) {
    this.controller = controller
  }
  
  async handle(req: Request, res: Response) {
    try {
      const offset: number = parseInt(req.query.offset as string)
      const limit: number = parseInt(req.query.limit as string)
      const shops = await this.controller.getShops(offset, limit)
      res.status(200).json(shops)
    } catch (err) {
      res.status(400).json({ error: (err as Error).message })
    }
  }

  static makeDefaultRouter(): ShopsRouter {
    const service = new SequelizeShopListFetchingService(sequelize)
    const controller = new UserShopsController(service)
    return new ShopsRouter(controller)
  }
}
