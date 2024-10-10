"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
// import ShopCoordinatesItem from './shop_coordinates_item'
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
    shopCode: {
        type: sequelize_1.DataTypes.STRING,
    },
    // coordinatesItemID: {
    //   type: DataTypes.STRING,
    //   references: {
    //     model: ShopCoordinatesItem,
    //     key: 'id',
    //   }
    // },
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
    coverImageURL: {
        type: sequelize_1.DataTypes.STRING,
    },
    thumbnailImageURL: {
        type: sequelize_1.DataTypes.STRING,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: __1.default,
    modelName: 'Shop',
});
exports.default = Shop;
