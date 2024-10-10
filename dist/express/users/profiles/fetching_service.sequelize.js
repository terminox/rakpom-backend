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
class SequelizeUserProfileFetchingService {
    constructor(sequelize) {
        this.sequelize = sequelize;
    }
    getUserProfile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const profile = yield user_profile_1.default.findOne({
                where: { id }
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
                avatarURL: 'https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=3486&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // TODO
            };
        });
    }
}
exports.default = SequelizeUserProfileFetchingService;
