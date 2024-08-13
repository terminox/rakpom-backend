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
const shop_reviews_controller_1 = __importDefault(require("./shop_reviews.controller"));
const shop_reviews_fetching_service_sequelize_1 = __importDefault(require("./shop_reviews_fetching_service.sequelize"));
const sequelize_1 = __importDefault(require("../../../sequelize"));
class ShopReviewsRouter {
    constructor(controller) {
        this.controller = controller;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const shopID = req.params.id;
                const shopReviews = yield this.controller.getShopReviews(shopID);
                res.status(200).json(shopReviews);
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
    }
    static makeDefaultRouter() {
        const service = new shop_reviews_fetching_service_sequelize_1.default(sequelize_1.default);
        const controller = new shop_reviews_controller_1.default(service);
        return new ShopReviewsRouter(controller);
    }
}
exports.default = ShopReviewsRouter;
