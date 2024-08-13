import { BookingRequestCreationPresenter, CreateBookingRequestResult, BookingConfirmationDisplayItem } from './booking_requests.controller'

export default class BookingRequestPresenter implements BookingRequestCreationPresenter {
  async presentBookingConfirmation(result: CreateBookingRequestResult): Promise<BookingConfirmationDisplayItem[]> {
    const items: BookingConfirmationDisplayItem[] = [
      { title: 'ชื่อร้าน', value: result.shopName },
      { title: 'ชื่อลูกค้า', value: result.customerName },
      { title: 'วันที่', value: result.date.toString() },
      { title: 'เวลาที่จอง', value: `${result.startHour}:${result.startMinute} - ${result.endHour}:${result.endMinute} น.` },
    ]
    return items
  }
}