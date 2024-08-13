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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const login_controller_1 = __importDefault(require("./login.controller"));
const login_user_store_sequelize_1 = __importDefault(require("./login_user_store.sequelize"));
const login_service_sequelize_1 = __importDefault(require("./login_service.sequelize"));
const sequelize_1 = __importDefault(require("../../../sequelize"));
const coder_1 = __importDefault(require("../../../shared/jwt/coder"));
class BcryptHasher {
    compareUser(user, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield bcryptjs_1.default.compare(password, user.hash);
            if (!result) {
                throw new Error(`Passwords mismatch`); // TODO
            }
        });
    }
}
class LoginRouter {
    constructor(controller) {
        this.controller = controller;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const email = req.body.email;
                const password = req.body.password;
                const credentials = yield this.controller.login(email, password);
                res.status(201).json(credentials);
            }
            catch (err) {
                res.status(400).json({ error: err.message });
            }
        });
    }
    static makeDefaultRouter() {
        const hasher = new BcryptHasher();
        const store = new login_user_store_sequelize_1.default(sequelize_1.default);
        const service = new login_service_sequelize_1.default(sequelize_1.default);
        const encoder = new coder_1.default();
        const controller = new login_controller_1.default(store, hasher, service, encoder);
        return new LoginRouter(controller);
    }
}
exports.default = LoginRouter;
