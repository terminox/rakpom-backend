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
class OTPController {
    // private hasher: Hasher
    // private store: UserStore
    // private encoder: SignupCredentialEncoder
    // constructor(hasher: Hasher, store: UserStore, encoder: SignupCredentialEncoder) {
    //   this.hasher = hasher
    //   this.store = store
    //   this.encoder = encoder
    // }
    requestPhoneSignupOTP(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            return { refCode: '123456' };
        });
    }
}
exports.default = OTPController;
