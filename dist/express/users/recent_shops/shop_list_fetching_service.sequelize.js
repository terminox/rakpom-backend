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
Object.defineProperty(exports, "__esModule", { value: true });
class SequelizeShopListFetchingService {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }
    getShops(offset, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO
            return [
                {
                    id: "01J4ME0AEAYC6CC5Y2ZDMFX0AV",
                    name: "ร้านลุงหนุ่ม",
                    imageURL: "https://images.unsplash.com/photo-1532710093739-9470acff878f?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                    address: "35/8 ถนน งามวงศ์วาน แขวงลาดยาว เขตจตุจักร กรุงเทพมหานคร  10900"
                }
            ];
        });
    }
}
exports.default = SequelizeShopListFetchingService;
