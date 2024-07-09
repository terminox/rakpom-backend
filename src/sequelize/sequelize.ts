import { Sequelize } from 'sequelize'

const POSTGRES_USERS_DB_NAME = process.env.POSTGRES_USERS_DB_NAME || 'postgres'
const POSTGRES_USER = process.env.POSTGRES_USER || 'postgres'
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || '1qaz2wsx3edc'
const POSTGRES_HOST = process.env.POSTGRES_HOST || '35.240.255.177'
const POSTGRES_PORT = Number(process.env.POSTGRES_PORT || 5432)

const sequelize = new Sequelize(POSTGRES_USERS_DB_NAME, POSTGRES_USER, POSTGRES_PASSWORD, {
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  dialect: 'postgres',
})

// const sequelize = new Sequelize('sqlite::memory:')

export default sequelize
