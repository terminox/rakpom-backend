"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
const booking_request_1 = __importDefault(require("./booking_request"));
class BookingRequestAction extends sequelize_1.Model {
}
BookingRequestAction.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        unique: true,
    },
    bookingRequestID: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: booking_request_1.default,
            key: 'id',
        }
    },
    action: {
        type: sequelize_1.DataTypes.ENUM('accept', 'reject'),
        allowNull: false,
    },
}, {
    sequelize: __1.default,
    modelName: 'BookingRequestAction'
});
exports.default = BookingRequestAction;
