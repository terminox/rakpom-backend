import { Sequelize } from 'sequelize'

import { ShopDetailFetchingService, ShopDetail } from './shop_detail.controller'

import Shop from '../../../sequelize/models/shop'
import ReviewItem from '../../../sequelize/models/review_item'

export default class SequelizeShopReviewsFetchingService implements ShopDetailFetchingService {
  
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async getShopDetail(shopID: string): Promise<ShopDetail> {
    const shop = await Shop.findOne({ where : { id: shopID } })

    if (shop === null) {
      throw new Error('Shop not found') // TODO: 
    }

    const reviews = await ReviewItem.findAll({ where: { shopID } })
    const reviewCount = reviews.length
    const rating = reviewCount > 0 
      ? reviews.reduce((sum, review) => sum + review.score, 0) / reviewCount
      : 0

    const shopDetail: ShopDetail = {
      id: shop.id,
      name: shop.shopName,
      ownerName: shop.shopOwnerName,
      phone: shop.phone,
      imageURL: shop.coverImageURL,
      rating,
      reviewCount,
      address: shop.address,
      businessHours: '10:00น. - 20:00น.'
    }

    return shopDetail 
  }
}
