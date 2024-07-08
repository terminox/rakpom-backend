export default class BookingRequestController {

  private service: BookingRequestCreationService
  private presenter: BookingRequestCreationPresenter

  constructor(service: BookingRequestCreationService, presenter: BookingRequestCreationPresenter) {
    this.service = service
    this.presenter = presenter
  }

  async createBookingRequest(payload: CreateBookingRequestPayload): Promise<BookingConfirmationDisplayItem[]> {
    const result = await this.service.createBookingRequest(payload)
    const items = await this.presenter.presentBookingConfirmation(result)
    return items 
  }
}

export interface BookingRequestCreationService {
  createBookingRequest(payload: CreateBookingRequestPayload): Promise<CreateBookingRequestResult>
}

export interface BookingRequestCreationPresenter {
  presentBookingConfirmation(result: CreateBookingRequestResult): Promise<BookingConfirmationDisplayItem[]>
}

export type CreateBookingRequestPayload = {
  userID: string
  shopID: string
  date: Date
  startHour: number
  startMinute: number
  endHour: number
  endMinute: number
}

export type CreateBookingRequestResult = {
  shopName: string
  customerName: string
  date: Date
  startHour: number
  startMinute: number
  endHour: number
  endMinute: number
}

export type BookingConfirmationDisplayItem = {
  title: string
  value: string
}
