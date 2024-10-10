"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class BookingRequestPresenter {
    presentBookingConfirmation(result) {
        return __awaiter(this, void 0, void 0, function* () {
            const startMinute = result.startMinute < 10 ? `0${result.startMinute}` : result.startMinute;
            const endMinute = result.endMinute < 10 ? `0${result.endMinute}` : result.endMinute;
            const items = [
                { title: 'ชื่อร้าน', value: result.shopName },
                { title: 'ชื่อลูกค้า', value: result.customerName },
                { title: 'วันที่', value: result.date.toString() },
                { title: 'เวลาที่จอง', value: `${result.startHour}:${startMinute} - ${result.endHour}:${endMinute} น.` },
            ];
            return items;
        });
    }
}
exports.default = BookingRequestPresenter;
