import User from './user'
import Shop from './shop'

export default class BookingRequest {
  private user: User
  private shop: Shop
  private startDate: Date
  private endDate: Date

  constructor(user: User, shop: Shop, startDate: Date, endDate: Date) {
    this.user = user
    this.shop = shop
    this.startDate = startDate
    this.endDate = endDate
  }
}
