import { Sequelize } from 'sequelize'

import { ShopReviewsFetchingService, ShopReview } from './shop_reviews.controller'

export default class SequelizeShopReviewsFetchingService implements ShopReviewsFetchingService {
  
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async getShopReviews(shopID: string): Promise<ShopReview[]> {
    // TODO
    return []
  }
}
