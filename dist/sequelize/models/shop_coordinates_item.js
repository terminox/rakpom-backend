"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
const shop_1 = __importDefault(require("./shop"));
class ShopCoordinatesItem extends sequelize_1.Model {
}
ShopCoordinatesItem.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        unique: true,
    },
    shopID: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: shop_1.default,
            key: 'id',
        }
    },
    latitude: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
    longitude: {
        type: sequelize_1.DataTypes.DOUBLE,
        allowNull: false,
    },
}, {
    sequelize: __1.default,
    modelName: 'ShopCoordinatesItem',
});
exports.default = ShopCoordinatesItem;
