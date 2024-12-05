import { Sequelize } from 'sequelize'

import BookingRequest from '../sequelize/models/booking_request'
import Shop from '../sequelize/models/shop'

export default class SequelizeNotificationPrepService {
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async preparePayload(bookingRequestID: string, shopID: string): Promise<NotificationPrepPayload> {
    const bookingRequest = await BookingRequest.findByPk(bookingRequestID)
    const shop = await Shop.findByPk(shopID)

    if (!bookingRequest || !shop) {
      throw new Error('Booking request or shop not found')
    }

    return {
      userID: bookingRequest.userID,
      shopName: shop.shopName,
      date: bookingRequest.date,
      startHour: bookingRequest.startHour,
      startMinute: bookingRequest.startMinute,
      endHour: bookingRequest.endHour,
      endMinute: bookingRequest.endMinute
    }
  }
}

export type NotificationPrepPayload = {
  userID: string
  shopName: string
  date: Date
  startHour: number
  startMinute: number
  endHour: number
  endMinute: number
}
