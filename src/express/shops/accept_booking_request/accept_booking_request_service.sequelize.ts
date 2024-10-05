import { Sequelize } from 'sequelize'
import { ulid } from 'ulid'

import BookingRequestAction from '../../../sequelize/models/booking_request_action'

export default class SequelizeAcceptBookingRequestService {
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async acceptBookingRequest(payload: AcceptBookingRequestPayload): Promise<AcceptBookingResult> {
    const bookingRequestID = payload.id
    const action = await BookingRequestAction.create({
      id: ulid(),
      bookingRequestID,
      action: 'accept'
    })
    return { id: action.id, bookingRequestID }
  }
}

export type AcceptBookingRequestPayload = {
  id: string
}

export type AcceptBookingResult = {
  id: string
  bookingRequestID: string
}
