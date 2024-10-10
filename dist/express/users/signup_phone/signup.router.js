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
const signup_controller_1 = __importDefault(require("./signup.controller"));
const user_store_sequelize_1 = __importDefault(require("./user_store.sequelize"));
const sequelize_1 = __importDefault(require("../../../sequelize"));
const coder_1 = __importDefault(require("../../../shared/jwt/coder"));
const response_object_1 = __importDefault(require("../../../shared/response_object"));
class BcryptHasher {
    hash(s) {
        return __awaiter(this, void 0, void 0, function* () {
            const salt = yield bcryptjs_1.default.genSalt(10);
            const hash = yield bcryptjs_1.default.hash(s, salt);
            return { hash, salt };
        });
    }
}
class SignupRouter {
    constructor(controller) {
        this.controller = controller;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // TODO: - Change this to the actual phone number signup
                // const email: string = req.body.email
                // const password: string = req.body.password
                const email = "test1@rakpom.dev";
                const password = "qwerqwerqwer";
                const credentials = yield this.controller.signup(email, password);
                res.status(201).json((0, response_object_1.default)({ type: "profile", accessToken: credentials.accessToken }));
            }
            catch (err) {
                res.status(400).json((0, response_object_1.default)(null, err));
            }
        });
    }
    static makeDefaultRouter() {
        const hasher = new BcryptHasher();
        const store = new user_store_sequelize_1.default(sequelize_1.default);
        const encoder = new coder_1.default();
        const controller = new signup_controller_1.default(hasher, store, encoder);
        return new SignupRouter(controller);
    }
}
exports.default = SignupRouter;
