import { Sequelize } from 'sequelize'

import { ShopListFetchingService, Shop } from './shops.controller'

export default class SequelizeShopListFetchingService implements ShopListFetchingService {

  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async getShops(offset: number, limit: number): Promise<Shop[]> {
    // TODO
    return []
  }
}
