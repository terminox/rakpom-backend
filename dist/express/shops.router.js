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
const express_1 = require("express");
const auth_1 = require("./middlewares/auth");
const sequelize_1 = __importDefault(require("../sequelize"));
const response_object_1 = __importDefault(require("../shared/response_object"));
const shop_profile_router_1 = __importDefault(require("./shops/shop_profile/shop_profile.router"));
const router_1 = __importDefault(require("./shops/shop_profile_update/router"));
const booking_request_fetching_service_sequelize_1 = __importDefault(require("./shops/booking_requests/booking_request_fetching_service.sequelize"));
const reject_booking_request_service_sequelize_1 = __importDefault(require("./shops/reject_booking_request/reject_booking_request_service.sequelize"));
const accept_booking_request_service_sequelize_1 = __importDefault(require("./shops/accept_booking_request/accept_booking_request_service.sequelize"));
const router = (0, express_1.Router)();
// // TODO: - Deprecate this route in favor of Firebase
// router.post('/login', (req: Request, res: Response) => {
//   const router = LoginRouter.makeDefaultRouter()
//   router.handle(req, res)
// })
// // TODO: - Deprecate this route in favor of Firebase
// router.post('/otps', (req: Request, res: Response) => {
//   const router = OTPRouter.makeDefaultRouter()
//   router.handle(req, res)
// })
// // TODO: - Deprecate this route in favor of Firebase
// router.post('/signup', (req: Request, res: Response) => {
//   const router = SignupRouter.makeDefaultRouter()
//   router.handle(req, res)
// })
// // TODO: - Deprecate this route in favor of Firebase
// router.post('/signup/phone', (req: Request, res: Response) => {
//   const router = PhoneSignupRouter.makeDefaultRouter()
//   router.handle(req, res)
// })
router.post('/signup/google', (req, res) => {
    // TODO
});
router.post('/signup/line', (req, res) => {
    // TODO
});
router.post('/signup/apple', (req, res) => {
    // TODO
});
router.get('/profiles/me', auth_1.shopAuth, (req, res) => {
    const router = shop_profile_router_1.default.makeDefaultRouter();
    router.handle(req, res);
});
router.patch('/profiles/me', auth_1.shopAuth, (req, res) => {
    const router = router_1.default.makeDefaultRouter();
    router.handle(req, res);
});
// View pending booking requests
router.get('/booking-requests', auth_1.shopAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shopID = res.locals.user.id;
        const service = new booking_request_fetching_service_sequelize_1.default(sequelize_1.default);
        const result = yield service.fetchPendingBookingRequests(shopID);
        res.status(200).json((0, response_object_1.default)(result));
    }
    catch (err) {
        res.status(400).json((0, response_object_1.default)(null, err));
    }
}));
// Reject a booking request
router.post('/booking-requests/:id/reject', auth_1.shopAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const service = new reject_booking_request_service_sequelize_1.default(sequelize_1.default);
        const result = yield service.rejectBookingRequest({ id });
        res.status(200).json((0, response_object_1.default)(result));
    }
    catch (err) {
        res.status(400).json((0, response_object_1.default)(null, err));
    }
}));
// Accept a booking request
router.post('/booking-requests/:id/accept', auth_1.shopAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const service = new accept_booking_request_service_sequelize_1.default(sequelize_1.default);
        const result = yield service.acceptBookingRequest({ id });
        res.status(200).json((0, response_object_1.default)(result));
    }
    catch (err) {
        res.status(400).json((0, response_object_1.default)(null, err));
    }
}));
exports.default = router;
