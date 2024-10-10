"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const users_router_1 = __importDefault(require("./users.router"));
const shops_router_1 = __importDefault(require("./shops.router"));
const app = (0, express_1.default)();
app.enable('trust proxy');
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.json());
app.use('/api/v1/users', users_router_1.default);
app.use('/api/v1/shops', shops_router_1.default);
app.use('/api/v1/hello', (req, res) => {
    res.send('Hello World');
});
exports.default = app;
