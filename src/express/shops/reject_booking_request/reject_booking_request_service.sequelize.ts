import { Sequelize } from 'sequelize'
import { ulid } from 'ulid'

import BookingRequestAction from '../../../sequelize/models/booking_request_action'

export default class SequelizeRejectBookingRequestService {
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async rejectBookingRequest(payload: RejectBookingRequestPayload): Promise<RejectBookingResult> {
    const bookingRequestID = payload.id
    const action = await BookingRequestAction.create({
      id: ulid(),
      bookingRequestID,
      action: 'reject'
    })
    return { id: action.id, bookingRequestID }
  }
}

export type RejectBookingRequestPayload = {
  id: string
}

export type RejectBookingResult = {
  id: string
  bookingRequestID: string
}
