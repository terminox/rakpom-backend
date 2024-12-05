import { Sequelize } from 'sequelize'

import { ShopListFetchingService } from './shops.controller'
import RecentBookingItem from '../../../sequelize/models/recent_booking_item'
import ShopModel from '../../../sequelize/models/shop'

type RecentShop = {
  id: string
  name: string
  imageURL: string
  address: string
}

export default class SequelizeRecentShopListFetchingService implements ShopListFetchingService {

  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async getShops(offset: number, limit: number): Promise<RecentShop[]> {
    const recentBookings = await RecentBookingItem.findAll({
      order: [['createdAt', 'DESC']],
      include: [{
        model: ShopModel,
        as: 'Shop',
        attributes: ['id', 'shopName', 'thumbnailImageURL', 'address']
      }]
    })

    // Filter out duplicates by shop ID
    const uniqueShops = new Map()
    recentBookings.forEach(booking => {
      const shop = booking.get('Shop') as ShopModel
      if (!uniqueShops.has(shop.id)) {
        uniqueShops.set(shop.id, {
          id: shop.id,
          name: shop.shopName,
          imageURL: shop.thumbnailImageURL,
          address: shop.address
        })
      }
    })

    // Convert to array and apply pagination
    const shops = Array.from(uniqueShops.values())
    return shops.slice(offset, offset + limit)
  }
}
