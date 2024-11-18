import { Request, Response } from 'express'

import ShopProfileController, { ShopProfileUpdatePayload } from './controller'
import SequelizeShopProfileUpdatingService from './shop_profile_updating_service.sequelize'

import sequelize from '../../../sequelize'
import response from '../../../shared/response_object'

export default class ShopProfileRouter {
    
  private controller: ShopProfileController 

  constructor(controller: ShopProfileController) {
    this.controller = controller
  }
  
  async handle(req: Request, res: Response) {
    try {
      const shopID: string = res.locals.user.id
      const payload: ShopProfileUpdatePayload = {
        shopName: req.body.name,
        shopOwnerName: req.body.ownerName,
        phone: req.body.phone,
        bankName: req.body.bankName,
        bankAccountNumber: req.body.bankAccountNumber,
        coverImageURL: req.body.imageURL,
        thumbnailImageURL: req.body.imageURL,
        address: req.body.address
      }
      await this.controller.updateShopProfile(shopID, payload)
      res.status(204).end()
    } catch (err) {
      res.status(400).json(response(null, err as Error))
    }
  }

  static makeDefaultRouter(): ShopProfileRouter {
    const service = new SequelizeShopProfileUpdatingService(sequelize)
    const controller = new ShopProfileController(service)
    return new ShopProfileRouter(controller)
  }
}
