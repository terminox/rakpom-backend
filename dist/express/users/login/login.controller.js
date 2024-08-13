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
class UserLoginController {
    constructor(store, validator, loginService, encoder) {
        this.store = store;
        this.validator = validator;
        this.loginService = loginService;
        this.encoder = encoder;
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.store.findUserByEmail(email);
            yield this.validator.compareUser(user, password);
            const result = yield this.loginService.login(user);
            const credentials = yield this.encoder.encodeLoginResult(result);
            return credentials;
        });
    }
}
exports.default = UserLoginController;
