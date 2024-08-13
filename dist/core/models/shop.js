"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperatingHours = exports.OperatingDays = void 0;
class OperatingDays {
    constructor(sunday, monday, tuesday, wednesday, thursday, friday, saturday) {
        this.sunday = sunday;
        this.monday = monday;
        this.tuesday = tuesday;
        this.wednesday = wednesday;
        this.thursday = thursday;
        this.friday = friday;
        this.saturday = saturday;
    }
}
exports.OperatingDays = OperatingDays;
class OperatingHours {
    constructor(open, close) {
        this.open = open;
        this.close = close;
    }
}
exports.OperatingHours = OperatingHours;
class Shop {
    constructor(id, shopName, shopOwnerName, coordinates, phone, bankName, bankAccountNumber, operatingDays, operatingHours, juniorPriceTHB, seniorPriceTHB, shopImages, hairStyleImages) {
        this.id = id;
        this.shopName = shopName;
        this.shopOwnerName = shopOwnerName;
        this.coordinates = coordinates;
        this.phone = phone;
        this.bankName = bankName;
        this.bankAccountNumber = bankAccountNumber;
        this.operatingDays = operatingDays;
        this.operatingHours = operatingHours;
        this.juniorPriceTHB = juniorPriceTHB;
        this.seniorPriceTHB = seniorPriceTHB;
        this.shopImages = shopImages;
        this.hairStyleImages = hairStyleImages;
    }
}
exports.default = Shop;
