"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
class Transaction extends sequelize_1.Model {
}
Transaction.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        unique: true,
    },
    userID: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    shopID: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    type: {
        type: sequelize_1.DataTypes.ENUM('cash', 'qr', 'point'),
        allowNull: false,
    },
}, {
    sequelize: __1.default,
    modelName: 'Transaction',
});
exports.default = Transaction;
