import { Sequelize } from 'sequelize'
import { ulid } from 'ulid'

import { BookingRequestCreationService, CreateBookingRequestPayload, CreateBookingRequestResult } from './booking_request_creation.controller'

import BookingRequest from '../../../sequelize/models/booking_request'
import User from '../../../sequelize/models/user_profile'
import Shop from '../../../sequelize/models/shop'

export default class SequelizeBookingRequestCreationService implements BookingRequestCreationService {
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async createBookingRequest(payload: CreateBookingRequestPayload): Promise<CreateBookingRequestResult> {
    const user = await User.findOne({ where: { id: payload.userID } })
    const shop = await Shop.findOne({ where: { id: payload.shopID } })

    if (user == null || shop == null) {
      throw new Error('Invalid booking') // TODO
    }

    const bookingRequest = await BookingRequest.create({
      id: ulid(),
      userID: user.id,
      shopID: shop.id,
      date: payload.date,
      startHour: payload.startHour,
      startMinute: payload.startMinute,
      endHour: payload.endHour,
      endMinute: payload.endMinute,
      status: 'pending'
    })

    return {
      shopName: shop.shopName,
      customerName: user.fullName,
      date: bookingRequest.date,
      startHour: bookingRequest.startHour,
      startMinute: bookingRequest.startMinute,
      endHour: bookingRequest.endHour,
      endMinute: bookingRequest.endMinute,
    }
  }
}