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
const shop_1 = __importDefault(require("../../../sequelize/models/shop"));
class SequelizeShopProfileUpdatingService {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }
    updateShopProfile(shopID, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const [, affectedRows] = yield shop_1.default.update(payload, {
                where: { id: shopID },
                returning: true
            });
            if (affectedRows.length === 0) {
                throw new Error(`Shop with ID ${shopID} not found`); // TODO
            }
            return {
                id: affectedRows[0].id,
                shopName: affectedRows[0].shopName,
                shopOwnerName: affectedRows[0].shopOwnerName,
                phone: affectedRows[0].phone,
                bankName: affectedRows[0].bankName,
                bankAccountNumber: affectedRows[0].bankAccountNumber,
                juniorPriceTHB: affectedRows[0].juniorPriceTHB,
                seniorPriceTHB: affectedRows[0].seniorPriceTHB,
            };
        });
    }
}
exports.default = SequelizeShopProfileUpdatingService;
