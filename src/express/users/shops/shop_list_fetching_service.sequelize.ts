import _ from 'lodash'
import { Sequelize } from 'sequelize'

import { ShopListFetchingService, Shop } from './shops.controller'

import SequelizeShop from '../../../sequelize/models/shop'

export default class SequelizeShopListFetchingService implements ShopListFetchingService {

  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async getShops(offset: number, limit: number): Promise<Shop[]> {
    const seqShops = await SequelizeShop.findAll({ offset, limit })
    console.log('seqShops:', seqShops)
    const shops: Shop[] = _.map(seqShops, (shop: SequelizeShop): Shop => {
      return {
        id: shop.id,
        name: shop.shopName,
        imageURL: shop.thumbnailImageURL,
        address: shop.address,
      }
    })
    return shops
  }
}
