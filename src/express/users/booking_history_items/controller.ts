export default class BookingHistoryController {

  private service: BookingHistoryFetchingService

  constructor(service: BookingHistoryFetchingService) {
    this.service = service
  }

  async getBookingHistory(offset: number, limit: number): Promise<BookingHistoryItem[]> {
    const items = await this.service.getBookingHistory(offset, limit)
    return items 
  }
}

export interface BookingHistoryFetchingService {
  getBookingHistory(offset: number, limit: number): Promise<BookingHistoryItem[]>
}

export type BookingHistoryItem = {
  id: string
  shopName: string
  location: string
  description: string
  points: number
  price: string
  imageURL: string
}
