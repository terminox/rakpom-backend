"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const login_router_1 = __importDefault(require("./login/login.router"));
const signup_router_1 = __importDefault(require("./signup/signup.router"));
const shops_router_1 = __importDefault(require("./shops/shops.router"));
const shops_router_2 = __importDefault(require("./recent_shops/shops.router"));
const shop_detail_router_1 = __importDefault(require("./shop_detail/shop_detail.router"));
const shop_reviews_router_1 = __importDefault(require("./shop_reviews/shop_reviews.router"));
const booking_requests_router_1 = __importDefault(require("./booking_requests/booking_requests.router"));
const router = (0, express_1.Router)();
router.post('/login', (req, res) => {
    const router = login_router_1.default.makeDefaultRouter();
    router.handle(req, res);
});
router.post('/signup', (req, res) => {
    const router = signup_router_1.default.makeDefaultRouter();
    router.handle(req, res);
});
// router.post('/signup/google', (req: Request, res: Response) => {
//   // TODO
// })
// router.post('/signup/line', (req: Request, res: Response) => {
//   // TODO
// })
// router.post('/signup/apple', (req: Request, res: Response) => {
//   // TODO
// })
router.get('/profiles/me', auth_1.userAuth, (req, res) => {
    // TODO
});
router.patch('/profiles/me', auth_1.userAuth, (req, res) => {
    // TODO
});
router.post('/booking-requests', auth_1.userAuth, (req, res) => {
    const router = booking_requests_router_1.default.makeDefaultRouter();
    router.handle(req, res);
});
router.get('/shops/pages', auth_1.userAuth, (req, res) => {
    const router = shops_router_1.default.makeDefaultRouter();
    router.handle(req, res);
});
router.get('/shops/recent', (req, res) => {
    const router = shops_router_2.default.makeDefaultRouter();
    router.handle(req, res);
});
router.get('/shops/:id', (req, res) => {
    const router = shop_detail_router_1.default.makeDefaultRouter();
    router.handle(req, res);
});
router.get('/shops/:id/reviews', (req, res) => {
    const router = shop_reviews_router_1.default.makeDefaultRouter();
    router.handle(req, res);
});
exports.default = router;
