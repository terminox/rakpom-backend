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
const user_profile_1 = __importDefault(require("../../../sequelize/models/user_profile"));
class SequelizeLoginService {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield user_profile_1.default.findOne({
                where: { email: user.email }
            });
            if (profile == null) {
                throw new Error('User profile not found'); // TODO
            }
            return {
                id: profile.id,
                email: profile.email,
                memberID: String(profile.memberID),
                fullName: profile.fullName,
                gender: profile.gender,
                phoneNumber: profile.phoneNumber,
            };
        });
    }
}
exports.default = SequelizeLoginService;
