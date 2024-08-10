import { Sequelize } from 'sequelize'

import { ShopProfileUpdatingService, ShopProfileUpdatePayload, ShopProfile } from './controller'

import Shop from '../../../sequelize/models/shop'

export default class SequelizeShopProfileUpdatingService implements ShopProfileUpdatingService {
  
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async updateShopProfile(shopID: string, payload: ShopProfileUpdatePayload): Promise<ShopProfile> {
    const [, affectedRows] = await Shop.update(payload, {
      where: { id: shopID },
      returning: true 
    })

    if (affectedRows.length === 0) {
      throw new Error(`Shop with ID ${shopID} not found`) // TODO
    }

    return {
      id: affectedRows[0].id,
      shopName: affectedRows[0].shopName,
      shopOwnerName: affectedRows[0].shopOwnerName,
      phone: affectedRows[0].phone,
      bankName: affectedRows[0].bankName,
      bankAccountNumber: affectedRows[0].bankAccountNumber,
      juniorPriceTHB: affectedRows[0].juniorPriceTHB,
      seniorPriceTHB: affectedRows[0].seniorPriceTHB,
    }
  }
}
