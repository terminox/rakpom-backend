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
exports.shopAuth = exports.userAuth = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_auth_sequelize_1 = __importDefault(require("./user_auth.sequelize"));
const shop_auth_sequelize_1 = __importDefault(require("./shop_auth.sequelize"));
const sequelize_1 = __importDefault(require("../../../sequelize"));
class AuthenticationController {
    constructor(decoder, service) {
        this.decoder = decoder;
        this.service = service;
    }
    authenticate(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = yield this.decoder.decode(token);
            const user = yield this.service.authenticate(payload);
            return user;
        });
    }
}
class JWTDecoder {
    decode(token) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = jsonwebtoken_1.default.verify(token, 'secret');
            const payload = { id: result.data.id };
            return payload;
        });
    }
}
function authMiddleware(decoder, service) {
    return function (req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
            if (!token) {
                res.status(401).json({ error: 'Unauthorized' }); // TODO
                return;
            }
            const controller = new AuthenticationController(decoder, service);
            const user = yield controller.authenticate(token);
            res.locals.user = user;
            next();
        });
    };
}
exports.authMiddleware = authMiddleware;
function userAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const decoder = new JWTDecoder();
        const service = new user_auth_sequelize_1.default(sequelize_1.default);
        const middleware = authMiddleware(decoder, service);
        return middleware(req, res, next);
    });
}
exports.userAuth = userAuth;
function shopAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const decoder = new JWTDecoder();
        const service = new shop_auth_sequelize_1.default(sequelize_1.default);
        const middleware = authMiddleware(decoder, service);
        return middleware(req, res, next);
    });
}
exports.shopAuth = shopAuth;
