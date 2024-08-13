"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
const shop_coordinates_item_1 = __importDefault(require("./shop_coordinates_item"));
class Shop extends sequelize_1.Model {
}
Shop.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
        unique: true,
    },
    shopName: {
        type: sequelize_1.DataTypes.STRING,
    },
    shopOwnerName: {
        type: sequelize_1.DataTypes.STRING,
    },
    coordinatesItemID: {
        type: sequelize_1.DataTypes.STRING,
        references: {
            model: shop_coordinates_item_1.default,
            key: 'id',
        }
    },
    phone: {
        type: sequelize_1.DataTypes.STRING,
    },
    bankName: {
        type: sequelize_1.DataTypes.STRING,
    },
    bankAccountNumber: {
        type: sequelize_1.DataTypes.STRING,
    },
    // operatingDays: {
    //   type: DataTypes.STRING,
    // },
    // operatingHours: {
    //   type: DataTypes.STRING,
    // },
    juniorPriceTHB: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    seniorPriceTHB: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    // shopImages: {
    //   type: DataTypes.STRING,
    // },
    // hairStyleImages: {
    //   type: DataTypes.STRING,
    // },
}, {
    sequelize: __1.default,
    modelName: 'Shop',
});
exports.default = Shop;
