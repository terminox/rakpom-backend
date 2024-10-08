import { BookingRequestCreationPresenter, CreateBookingRequestResult, BookingConfirmationDisplayItem } from './booking_request_creation.controller'

export default class BookingRequestPresenter implements BookingRequestCreationPresenter {
  async presentBookingConfirmation(result: CreateBookingRequestResult): Promise<BookingConfirmationDisplayItem[]> {
    const startMinute = result.startMinute < 10 ? `0${result.startMinute}` : result.startMinute
    const endMinute = result.endMinute < 10 ? `0${result.endMinute}` : result.endMinute
    const items: BookingConfirmationDisplayItem[] = [
      { title: 'ชื่อร้าน', value: result.shopName },
      { title: 'ชื่อลูกค้า', value: result.customerName },
      { title: 'วันที่', value: result.date.toString() },
      { title: 'เวลาที่จอง', value: `${result.startHour}:${startMinute} - ${result.endHour}:${endMinute} น.` },
    ]
    return items
  }
}