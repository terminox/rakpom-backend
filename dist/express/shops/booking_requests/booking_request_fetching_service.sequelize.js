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
const booking_request_1 = __importDefault(require("../../../sequelize/models/booking_request"));
const user_profile_1 = __importDefault(require("../../../sequelize/models/user_profile"));
class SequelizeBookingRequestFetchingService {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }
    fetchPendingBookingRequests(shopID) {
        return __awaiter(this, void 0, void 0, function* () {
            const sqPendingRequests = yield booking_request_1.default.findAll({
                where: {
                    shopID,
                    status: 'pending'
                },
                include: {
                    model: user_profile_1.default,
                }
            });
            const pendingRequests = sqPendingRequests.map((sqPendingRequest) => {
                const startMinute = sqPendingRequest.startMinute < 10 ? `0${sqPendingRequest.startMinute}` : sqPendingRequest.startMinute;
                const endMinute = sqPendingRequest.endMinute < 10 ? `0${sqPendingRequest.endMinute}` : sqPendingRequest.endMinute;
                return {
                    id: sqPendingRequest.id,
                    fullName: sqPendingRequest.UserProfile.fullName,
                    date: sqPendingRequest.date.toString(),
                    time: `${sqPendingRequest.startHour}:${startMinute} - ${sqPendingRequest.endHour}:${endMinute}`
                };
            });
            return pendingRequests;
        });
    }
}
exports.default = SequelizeBookingRequestFetchingService;
