"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BookingAlreadyExistedError extends Error {
    constructor() {
        const msg = 'BookingAlreadyExistedError';
        super(msg);
        this.name = msg;
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
