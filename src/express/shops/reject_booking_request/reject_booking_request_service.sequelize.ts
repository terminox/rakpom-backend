import { Sequelize } from 'sequelize'

import BookingRequest from '../../../sequelize/models/booking_request'

export default class SequelizeRejectBookingRequestService {
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async rejectBookingRequest(payload: RejectBookingRequestPayload): Promise<RejectBookingResult> {
    const bookingRequestID = payload.id

    const result = await BookingRequest.update({
      status: 'rejected'
    }, {
      where: {
        id: bookingRequestID
      }
    })

    return { bookingRequestID }
  }
}

export type RejectBookingRequestPayload = {
  id: string
}

export type RejectBookingResult = {
  bookingRequestID: string
}
