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
const controller_1 = __importDefault(require("./controller"));
const list_fetching_service_sequelize_1 = __importDefault(require("./list_fetching_service.sequelize"));
const sequelize_1 = __importDefault(require("../../../sequelize"));
const response_object_1 = __importDefault(require("../../../shared/response_object"));
class Router {
    constructor(controller) {
        this.controller = controller;
    }
    handle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const offset = parseInt(req.query.offset);
                const limit = parseInt(req.query.limit);
                const notifications = yield this.controller.getNotificationList(offset, limit);
                res.status(200).json((0, response_object_1.default)(notifications));
            }
            catch (err) {
                res.status(400).json((0, response_object_1.default)(null, err));
            }
        });
    }
    static makeDefaultRouter() {
        const service = new list_fetching_service_sequelize_1.default(sequelize_1.default);
        const controller = new controller_1.default(service);
        return new Router(controller);
    }
}
exports.default = Router;
