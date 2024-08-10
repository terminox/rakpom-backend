import { Sequelize } from 'sequelize'
import { ulid } from 'ulid'

import { ShopStore, SignupPayload, SignupResult } from './signup.controller'

import BasicAuthItem from '../../../sequelize/models/basic_auth_item'
import Shop from '../../../sequelize/models/shop'

export default class SequelizeShopStore implements ShopStore {

  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async storeShop(payload: SignupPayload): Promise<SignupResult> {
    const transaction = await this.sequelize.transaction()

    try {
      const shop = await Shop.create({
        id: ulid(),
      }, {
        transaction
      })
  
      await BasicAuthItem.create({
        id: ulid(),
        email: payload.email,
        hash: payload.hash,
        salt: payload.salt,
        authorizableID: shop.id,
      }, {
        transaction
      })
  
      await transaction.commit()

      return {
        id: shop.id,
      }
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  }
}