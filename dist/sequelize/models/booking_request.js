"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
const user_profile_1 = __importDefault(require("./user_profile"));
const shop_1 = __importDefault(require("./shop"));
class BookingRequest extends sequelize_1.Model {
}
BookingRequest.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        unique: true,
    },
    userID: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: user_profile_1.default,
            key: 'id',
        }
    },
    shopID: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: shop_1.default,
            key: 'id',
        }
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
    startHour: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    startMinute: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    endHour: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    endMinute: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('pending', 'accepted', 'rejected'),
        allowNull: false,
    }
}, {
    sequelize: __1.default,
    modelName: 'BookingRequest'
});
BookingRequest.belongsTo(user_profile_1.default, {
    foreignKey: 'userID',
    targetKey: 'id'
});
BookingRequest.belongsTo(shop_1.default, {
    foreignKey: 'shopID',
    targetKey: 'id'
});
exports.default = BookingRequest;
