"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BookingRequest {
    constructor(user, shop, startDate, endDate) {
        this.user = user;
        this.shop = shop;
        this.startDate = startDate;
        this.endDate = endDate;
    }
}
exports.default = BookingRequest;
