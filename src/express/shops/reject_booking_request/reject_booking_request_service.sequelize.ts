import { Sequelize } from 'sequelize'

import BookingRequest from '../../../sequelize/models/booking_request'

export default class SequelizeRejectBookingRequestService {
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async rejectBookingRequest(payload: RejectBookingRequestPayload): Promise<RejectBookingResult> {
    await BookingRequest.destroy({ where: { id: payload.id }, force: true })

    const result: RejectBookingResult = {
      id: payload.id
    }

    return result 
  }
}

export type RejectBookingRequestPayload = {
  id: string
}

export type RejectBookingResult = {
  id: string
}
