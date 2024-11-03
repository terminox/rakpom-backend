import { Sequelize } from 'sequelize'
import { ShopListFetchingService, Shop } from './shops.controller'
import RecentBookingItem from '../../../sequelize/models/recent_booking_item'
import ShopModel from '../../../sequelize/models/shop'

type RecentShop = {
  id: string
  name: string
  imageURL: string
  address: string
}

export default class SequelizeShopListFetchingService implements ShopListFetchingService {

  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async getShops(offset: number, limit: number): Promise<RecentShop[]> {
    const recentBookings = await RecentBookingItem.findAll({
      limit: 3,
      order: [['createdAt', 'DESC']],
      include: [{
        model: ShopModel,
        as: 'Shop',
        attributes: ['id', 'shopName', 'thumbnailImageURL', 'address']
      }]
    })

    return recentBookings.map(booking => {
      const shop = booking.get('Shop') as ShopModel
      return {
        id: shop.id,
        name: shop.shopName,
        imageURL: shop.thumbnailImageURL,
        address: shop.address
      }
    })
  }
}
