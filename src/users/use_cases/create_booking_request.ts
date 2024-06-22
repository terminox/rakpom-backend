import BookingRequest from '../../core/models/booking_request'

export class CreateBookingRequestPayload {
  userId: string
  shopId: string
  startDate: Date
  endDate: Date

  constructor(userId: string, shopId: string, startDate: Date, endDate: Date) {
    this.userId = userId
    this.shopId = shopId
    this.startDate = startDate
    this.endDate = endDate
  }
}

export interface BookingRequestStore {
  storeBookingRequest(payload: CreateBookingRequestPayload): Promise<BookingRequest>
}

export interface CreateBookingRequestUseCaseDelegate {
  didCreateBookingRequest(payload: CreateBookingRequestPayload): void
}

export default class CreateBookingRequestUseCase {

  private store: BookingRequestStore
  private delegate: CreateBookingRequestUseCaseDelegate | null

  constructor(store: BookingRequestStore, delegate: CreateBookingRequestUseCaseDelegate | null = null) {
    this.store = store
    this.delegate = delegate
  }

  async createBookingRequest(payload: CreateBookingRequestPayload): Promise<BookingRequest> {
    /*
      1. Attempt to store booking requests (in the database)
      2. Delegate event
     */

    let bookingRequest = await this.store.storeBookingRequest(payload)
    this.delegate?.didCreateBookingRequest(payload)
    return bookingRequest
  }
}
