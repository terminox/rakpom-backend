import { Sequelize } from 'sequelize'

import { ShopProfileFetchingService, ShopProfile } from './shop_profile.controller'

import Shop from '../../sequelize/models/shop'

export default class SequelizeShopProfileFetchingService implements ShopProfileFetchingService {
  
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async getShopProfile(shopID: string): Promise<ShopProfile> {
    const shop = await Shop.findOne({ where: { id: shopID } })

    if (shop == null) {
      throw new Error(`Shop with ID ${shopID} not found`) // TODO
    }

    return {
      id: shop.id,
    }
  }
}
