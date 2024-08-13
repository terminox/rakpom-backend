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
const booking_requests_controller_1 = __importDefault(require("./booking_requests.controller"));
const booking_requests_presenter_1 = __importDefault(require("./booking_requests.presenter"));
const booking_request_creation_service_sequelize_1 = __importDefault(require("./booking_request_creation_service.sequelize"));
const sequelize_1 = __importDefault(require("../../../sequelize"));
class BookingRequestsRouter {
    constructor(controller) {
        this.controller = controller;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userID = res.locals.user.id;
                const shopID = req.body.shopID;
                const date = new Date(req.body.date);
                const startHour = parseInt(req.body.startHour);
                const startMinute = parseInt(req.body.startMinute);
                const endHour = parseInt(req.body.endHour);
                const endMinute = parseInt(req.body.endMinute);
                const result = yield this.controller.createBookingRequest({
                    userID,
                    shopID,
                    date,
                    startHour,
                    startMinute,
                    endHour,
                    endMinute
                });
                res.status(200).json(result);
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
    }
    static makeDefaultRouter() {
        const service = new booking_request_creation_service_sequelize_1.default(sequelize_1.default);
        const presenter = new booking_requests_presenter_1.default();
        const controller = new booking_requests_controller_1.default(service, presenter);
        return new BookingRequestsRouter(controller);
    }
}
exports.default = BookingRequestsRouter;
