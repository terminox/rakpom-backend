import { Op } from 'sequelize'

import BookingRequest from '../../core/models/booking_request'
import { CreateBookingRequestPayload, BookingRequestStore } from '../use_cases/create_booking_request'

import SequelizeBookingRequest from '../../../sequelize/booking_request.sequelize'
import SequelizeConfirmedBooking from '../../../sequelize/confirmed_booking.sequelize'

class BookingAlreadyExistedError extends Error {
  constructor() {
    const msg = 'BookingAlreadyExistedError'
    super(msg)
    this.name = msg
  }
}

// export default class SequelizeBookingRequestStore implements BookingRequestStore {
//   async storeBookingRequest(payload: CreateBookingRequestPayload): Promise<BookingRequest> {
//     /*
//       1. Check if the booking request intercepts with confirmed booking
//       2a. If it does, respond with existing booking message
//       2b. If it does not, create the booking request
//      */

//     const confirmBookings = await SequelizeConfirmedBooking.findAll({
//       where: {
//         shopId: payload.shopId,

//         [Op.or]: [
//           {
//             startDate: {
//               [Op.between]: [payload.startDate, payload.endDate]
//             }
//           },
//           {
//             endDate: {
//               [Op.between]: [payload.startDate, payload.endDate]
//             }
//           }
//         ]
//       }
//     })

//     if (confirmBookings.length > 0) {
//       throw new BookingAlreadyExistedError()
//     }

//     await SequelizeBookingRequest.create({
//       userId: payload.userId,
//       shopId: payload.shopId,
//       startDate: payload.startDate,
//       endDate: payload.endDate,
//     })

//     return payload
//   }
// }
