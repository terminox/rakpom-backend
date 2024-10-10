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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ulid_1 = require("ulid");
const booking_request_1 = __importDefault(require("../../../sequelize/models/booking_request"));
const user_profile_1 = __importDefault(require("../../../sequelize/models/user_profile"));
const shop_1 = __importDefault(require("../../../sequelize/models/shop"));
class SequelizeBookingRequestCreationService {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }
    createBookingRequest(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_profile_1.default.findOne({ where: { id: payload.userID } });
            const shop = yield shop_1.default.findOne({ where: { id: payload.shopID } });
            if (user == null || shop == null) {
                throw new Error('Invalid booking'); // TODO
            }
            const bookingRequest = yield booking_request_1.default.create({
                id: (0, ulid_1.ulid)(),
                userID: user.id,
                shopID: shop.id,
                date: payload.date,
                startHour: payload.startHour,
                startMinute: payload.startMinute,
                endHour: payload.endHour,
                endMinute: payload.endMinute,
                status: 'pending'
            });
            return {
                shopName: shop.shopName,
                customerName: user.fullName,
                date: bookingRequest.date,
                startHour: bookingRequest.startHour,
                startMinute: bookingRequest.startMinute,
                endHour: bookingRequest.endHour,
                endMinute: bookingRequest.endMinute,
            };
        });
    }
}
exports.default = SequelizeBookingRequestCreationService;
