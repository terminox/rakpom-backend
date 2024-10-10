"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const POSTGRES_USERS_DB_NAME = process.env.POSTGRES_USERS_DB_NAME || 'rakpom-dev';
const POSTGRES_USER = process.env.POSTGRES_USER || 'root';
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'qwerqwerqwer';
const POSTGRES_HOST = process.env.POSTGRES_HOST || '127.0.0.1';
const POSTGRES_PORT = Number(process.env.POSTGRES_PORT || 5432);
const sequelize = new sequelize_1.Sequelize(POSTGRES_USERS_DB_NAME, POSTGRES_USER, POSTGRES_PASSWORD, {
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});
// const sequelize = new Sequelize('sqlite::memory:')
exports.default = sequelize;
