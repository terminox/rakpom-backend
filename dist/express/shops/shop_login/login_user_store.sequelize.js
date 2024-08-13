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
const basic_auth_item_1 = __importDefault(require("../../../sequelize/models/basic_auth_item"));
class SequelizeUserStore {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }
    findUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const authItem = yield basic_auth_item_1.default.findOne({
                where: { email }
            });
            if (authItem == null) {
                throw new Error(''); // TODO
            }
            return {
                email: authItem.email,
                hash: authItem.hash,
                salt: authItem.salt,
                authorizableID: authItem.authorizableID,
            };
        });
    }
}
exports.default = SequelizeUserStore;
