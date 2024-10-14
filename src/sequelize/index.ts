import { Sequelize } from 'sequelize'

const POSTGRES_USERS_DB_NAME = process.env.POSTGRES_USERS_DB_NAME || 'rakpom-dev'
const POSTGRES_USER = process.env.POSTGRES_USER || 'root'
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'qwerqwerqwer'
const POSTGRES_HOST = process.env.POSTGRES_HOST || '127.0.0.1'
const POSTGRES_PORT = Number(process.env.POSTGRES_PORT || 5432)

var sequelize: Sequelize

if (process.env.NODE_ENV === 'development') {
  sequelize = new Sequelize(POSTGRES_USERS_DB_NAME, POSTGRES_USER, POSTGRES_PASSWORD, {
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    dialect: 'postgres',
  })
} else {
  sequelize = new Sequelize(POSTGRES_USERS_DB_NAME, POSTGRES_USER, POSTGRES_PASSWORD, {
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
  })
}

// const sequelize = new Sequelize('sqlite::memory:')

export default sequelize
