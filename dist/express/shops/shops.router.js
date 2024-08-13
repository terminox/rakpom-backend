"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const login_router_1 = __importDefault(require("./shop_login/login.router"));
const signup_router_1 = __importDefault(require("./shop_signup/signup.router"));
const shop_profile_router_1 = __importDefault(require("./shop_profile/shop_profile.router"));
const router_1 = __importDefault(require("./shop_profile_update/router"));
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
router.get('/profiles/me', auth_1.shopAuth, (req, res) => {
    const router = shop_profile_router_1.default.makeDefaultRouter();
    router.handle(req, res);
});
router.patch('/profiles/me', auth_1.shopAuth, (req, res) => {
    const router = router_1.default.makeDefaultRouter();
    router.handle(req, res);
});
exports.default = router;
