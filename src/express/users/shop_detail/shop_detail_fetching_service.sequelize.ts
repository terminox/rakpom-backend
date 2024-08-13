import { Sequelize } from 'sequelize'

import { ShopDetailFetchingService, ShopDetail } from './shop_detail.controller'

export default class SequelizeShopReviewsFetchingService implements ShopDetailFetchingService {
  
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async getShopDetail(shopID: string): Promise<ShopDetail> {
    // TODO
    return {} as ShopDetail
  }
}
