import { Sequelize } from 'sequelize'

import BookingRequest from '../../../sequelize/models/booking_request'

export default class SequelizeAcceptBookingRequestService {
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async acceptBookingRequest(payload: AcceptBookingRequestPayload): Promise<AcceptBookingResult> {
    const bookingRequestID = payload.id

    const result = await BookingRequest.update({
      status: 'accepted'
    }, {
      where: {
        id: bookingRequestID
      }
    })

    return { bookingRequestID }
  }
}

export type AcceptBookingRequestPayload = {
  id: string
}

export type AcceptBookingResult = {
  bookingRequestID: string
}
