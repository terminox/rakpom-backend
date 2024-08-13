"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const __1 = __importDefault(require(".."));
class UserProfile extends sequelize_1.Model {
}
UserProfile.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
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
    memberID: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
    },
    fullName: sequelize_1.DataTypes.STRING,
    gender: sequelize_1.DataTypes.ENUM('male', 'female'),
    phoneNumber: sequelize_1.DataTypes.STRING
}, {
    sequelize: __1.default,
    modelName: 'UserProfile',
    indexes: [
        {
            unique: true,
            fields: ['email']
        },
        {
            unique: true,
            fields: ['memberID']
        }
    ]
});
exports.default = UserProfile;
