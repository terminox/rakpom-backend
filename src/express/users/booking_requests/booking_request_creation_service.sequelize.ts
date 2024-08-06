import { Sequelize } from 'sequelize'

import { BookingRequestCreationService, CreateBookingRequestPayload, CreateBookingRequestResult } from './booking_requests.controller'

export default class SequelizeBookingRequestCreationService implements BookingRequestCreationService {
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async createBookingRequest(payload: CreateBookingRequestPayload): Promise<CreateBookingRequestResult> {
    // const { userId, shopId, startDate, endDate } = payload
    // const query = `INSERT INTO booking_requests (user_id, shop_id, start_date, end_date) VALUES ('${userId}', '${shopId}', '${startDate.toISOString()}', '${endDate.toISOString()}')`
    // await this.sequelize.query(query)
    // return { userId, shopId, startDate, endDate }

    // TODO
    return {} as CreateBookingRequestResult
  }
}