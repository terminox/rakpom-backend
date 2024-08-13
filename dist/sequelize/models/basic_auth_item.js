"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
const user_profile_1 = __importDefault(require("./user_profile"));
const shop_1 = __importDefault(require("./shop"));
class BasicAuthItem extends sequelize_1.Model {
}
BasicAuthItem.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        },
    },
    hash: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    salt: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    authorizableID: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    }
}, {
    sequelize: __1.default,
    modelName: 'BasicAuthItem',
    indexes: [
        {
            unique: true,
            fields: ['email']
        },
    ]
});
BasicAuthItem.belongsTo(user_profile_1.default, {
    foreignKey: 'authorizableID',
});
BasicAuthItem.belongsTo(shop_1.default, {
    foreignKey: 'authorizableID',
});
exports.default = BasicAuthItem;
