import { Request, Response } from 'express'

import ShopDetailController from './shop_detail.controller'
import SequelizeShopDetailFetchingService from './shop_detail_fetching_service.sequelize'

import sequelize from '../../../sequelize'

export default class ShopDetailRouter {
    
  private controller: ShopDetailController 

  constructor(controller: ShopDetailController) {
    this.controller = controller
  }
  
  async handle(req: Request, res: Response) {
    try {
      const shopID: string = req.params.id
      const shopDetail = await this.controller.getShopDetail(shopID)
      res.status(200).json(shopDetail)
    } catch (err) {
      res.status(400).json({ error: (err as Error).message })
    }
  }

  static makeDefaultRouter(): ShopDetailRouter {
    const service = new SequelizeShopDetailFetchingService(sequelize)
    const controller = new ShopDetailController(service)
    return new ShopDetailRouter(controller)
  }
}
