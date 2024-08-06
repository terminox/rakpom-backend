import { Request, Response } from 'express'

import ShopProfileController from './shop_profile.controller'
import SequelizeShopProfileFetchingService from './shop_profile_fetching_service.sequelize'

import sequelize from '../../sequelize'
import response from '../../shared/response_object'

export default class ShopProfileRouter {
    
  private controller: ShopProfileController 

  constructor(controller: ShopProfileController) {
    this.controller = controller
  }
  
  async handle(req: Request, res: Response) {
    try {
      const shopID: string = res.locals.user.id
      const shopDetail = await this.controller.getShopProfile(shopID)
      res.status(200).json(response(shopDetail))
    } catch (err) {
      res.status(400).json(response(null, err as Error))
    }
  }

  static makeDefaultRouter(): ShopProfileRouter {
    const service = new SequelizeShopProfileFetchingService(sequelize)
    const controller = new ShopProfileController(service)
    return new ShopProfileRouter(controller)
  }
}
