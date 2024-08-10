import { Request, Response } from 'express'

import ShopReviewsController from './shop_reviews.controller'
import SequelizeShopReviewsFetchingService from './shop_reviews_fetching_service.sequelize'

import sequelize from '../../../sequelize'

export default class ShopReviewsRouter {
    
  private controller: ShopReviewsController 

  constructor(controller: ShopReviewsController) {
    this.controller = controller
  }
  
  async handle(req: Request, res: Response) {
    try {
      const shopID: string = req.params.id
      const shopReviews = await this.controller.getShopReviews(shopID)
      res.status(200).json(shopReviews)
    } catch (err) {
      res.status(400).json({ error: (err as Error).message })
    }
  }

  static makeDefaultRouter(): ShopReviewsRouter {
    const service = new SequelizeShopReviewsFetchingService(sequelize)
    const controller = new ShopReviewsController(service)
    return new ShopReviewsRouter(controller)
  }
}
