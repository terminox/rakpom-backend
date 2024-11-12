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
        shopName: shop.shopName,
        location: shop.address,
        description: "การใช้บริการ: ตัดผม",
        points: 0,
        price: '฿0',
        imageURL: shop.thumbnailImageURL,
      }
    })

    // return [
    //   {
    //     id: '1',
    //     shopName: 'Shop 1',
    //     location: 'Location 1',
    //     description: 'Description 1',
    //     points: 100,
    //     price: 'Price 1',
    //     imageURL: 'https://images.unsplash.com/photo-1532710093739-9470acff878f?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   },
    //   {
    //     id: '2',
    //     shopName: 'Shop 2',
    //     location: 'Location 2',
    //     description: 'Description 2',
    //     points: 150,
    //     price: 'Price 2',
    //     imageURL: 'https://images.unsplash.com/photo-1532710093739-9470acff878f?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   },
    //   {
    //     id: '3',
    //     shopName: 'Shop 3',
    //     location: 'Location 3',
    //     description: 'Description 3',
    //     points: 200,
    //     price: 'Price 3',
    //     imageURL: 'https://images.unsplash.com/photo-1593702288056-7927b442d0fa?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    //   }
    // ]
  }
}
