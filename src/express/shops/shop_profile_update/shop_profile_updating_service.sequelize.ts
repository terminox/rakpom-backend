import { Sequelize } from 'sequelize'

import { ShopProfileUpdatingService, ShopProfileUpdatePayload, ShopProfile } from './controller'

import Shop from '../../../sequelize/models/shop'

export default class SequelizeShopProfileUpdatingService implements ShopProfileUpdatingService {
  
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async updateShopProfile(shopID: string, payload: ShopProfileUpdatePayload) {
    const [, affectedRows] = await Shop.update(payload, {
      where: { id: shopID },
      returning: true 
    })

    if (affectedRows.length === 0) {
      throw new Error(`Shop with ID ${shopID} not found`) // TODO
    }
  }
}
