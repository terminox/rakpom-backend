import _ from 'lodash'
import { Sequelize } from 'sequelize'

import { BookingHistoryFetchingService, BookingHistoryItem } from './controller'
import RecentBookingItem from '../../../sequelize/models/recent_booking_item'
import ShopModel from '../../../sequelize/models/shop'

export default class SequelizeBookingHistoryFetchingService implements BookingHistoryFetchingService {

  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async getBookingHistory(offset: number, limit: number): Promise<BookingHistoryItem[]> {
    const recentBookings = await RecentBookingItem.findAll({
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
        shopName: shop.shopName,
        location: shop.address,
        description: "การใช้บริการ: ตัดผม",
        points: 0, // TODO: Remove this one
        price: `฿${booking.amount}`,
        imageURL: shop.thumbnailImageURL,
      }
    })
  }
}
