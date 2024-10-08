import { Sequelize } from 'sequelize'

import BookingRequest from '../../../sequelize/models/booking_request'
import UserProfile from '../../../sequelize/models/user_profile'

export default class SequelizeBookingRequestFetchingService {
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async fetchPendingBookingRequests(shopID: string): Promise<PendingBookingRequest[]> {
    const sqPendingRequests: BookingRequest[] = await BookingRequest.findAll({
      where: {
        shopID,
        status: 'pending'
      },
      include: {
        model: UserProfile,
      } 
    })

    const pendingRequests: PendingBookingRequest[] = sqPendingRequests.map((sqPendingRequest) => {
      const startMinute = sqPendingRequest.startMinute < 10 ? `0${sqPendingRequest.startMinute}` : sqPendingRequest.startMinute
      const endMinute = sqPendingRequest.endMinute < 10 ? `0${sqPendingRequest.endMinute}` : sqPendingRequest.endMinute
      return {
        id: sqPendingRequest.id,
        fullName: (sqPendingRequest as any).UserProfile.fullName,
        date: sqPendingRequest.date.toString(),
        time: `${sqPendingRequest.startHour}:${startMinute} - ${sqPendingRequest.endHour}:${endMinute}`
      }
    })

    return pendingRequests
  }
}

type PendingBookingRequest = {
  id: string
  fullName: string
  date: string
  time: string
}
