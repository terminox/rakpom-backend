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
const router_1 = __importDefault(require("./users/profiles/router"));
const shops_router_1 = __importDefault(require("./users/shops/shops.router"));
const shops_router_2 = __importDefault(require("./users/recent_shops/shops.router"));
const shop_detail_router_1 = __importDefault(require("./users/shop_detail/shop_detail.router"));
const shop_reviews_router_1 = __importDefault(require("./users/shop_reviews/shop_reviews.router"));
const booking_request_creation_router_1 = __importDefault(require("./users/booking_request_creation/booking_request_creation.router"));
const router_2 = __importDefault(require("./users/notifications/router"));
const router_3 = __importDefault(require("./users/booking_history_items/router"));
const cash_payment_service_sequelize_1 = __importDefault(require("./payment/cash/cash_payment_service.sequelize"));
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
router.get('/profiles/me', auth_1.userAuth, (req, res) => {
    const router = router_1.default.makeDefaultRouter();
    router.handle(req, res);
});
router.patch('/profiles/me', auth_1.userAuth, (req, res) => {
    // TODO
});
router.post('/booking-requests', auth_1.userAuth, (req, res) => {
    const router = booking_request_creation_router_1.default.makeDefaultRouter();
    router.handle(req, res);
});
router.get('/shops/pages', auth_1.userAuth, (req, res) => {
    const router = shops_router_1.default.makeDefaultRouter();
    router.handle(req, res);
});
router.get('/shops/recent', auth_1.userAuth, (req, res) => {
    const router = shops_router_2.default.makeDefaultRouter();
    router.handle(req, res);
});
router.get('/shops/:id', auth_1.userAuth, (req, res) => {
    const router = shop_detail_router_1.default.makeDefaultRouter();
    router.handle(req, res);
});
router.get('/shops/:id/reviews', auth_1.userAuth, (req, res) => {
    const router = shop_reviews_router_1.default.makeDefaultRouter();
    router.handle(req, res);
});
router.get('/notifications/pages', auth_1.userAuth, (req, res) => {
    const router = router_2.default.makeDefaultRouter();
    router.handle(req, res);
});
router.get('/booking_history_items/pages', auth_1.userAuth, (req, res) => {
    const router = router_3.default.makeDefaultRouter();
    router.handle(req, res);
});
// Submit a QR payment
router.post('/payment/qr', auth_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = res.locals.user.id;
        const shopCode = req.body.shopCode;
        const amount = Number(req.body.amount);
        const service = new cash_payment_service_sequelize_1.default(sequelize_1.default);
        const result = yield service.submitCashPayment({ userID, shopCode, amount });
        res.status(200).json((0, response_object_1.default)(result));
    }
    catch (err) {
        res.status(400).json((0, response_object_1.default)(null, err));
    }
}));
// Submit a cash payment
router.post('/payment/cash', auth_1.userAuth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userID = res.locals.user.id;
        const shopCode = req.body.shopCode;
        const amount = Number(req.body.amount);
        const service = new cash_payment_service_sequelize_1.default(sequelize_1.default);
        const result = yield service.submitCashPayment({ userID, shopCode, amount });
        res.status(200).json((0, response_object_1.default)(result));
    }
    catch (err) {
        res.status(400).json((0, response_object_1.default)(null, err));
    }
}));
exports.default = router;
