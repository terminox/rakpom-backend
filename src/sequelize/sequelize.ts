import { Sequelize } from 'sequelize'

// const POSTGRES_USERS_DB_NAME = process.env.POSTGRES_USERS_DB_NAME || ''
// const POSTGRES_USER = process.env.POSTGRES_USER || ''
// const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || ''
// const POSTGRES_HOST = process.env.POSTGRES_HOST || ''
// const POSTGRES_PORT = Number(process.env.POSTGRES_PORT)
// 
// const sequelize = new Sequelize(POSTGRES_USERS_DB_NAME, POSTGRES_USER, POSTGRES_PASSWORD, {
//   host: POSTGRES_HOST,
//   port: POSTGRES_PORT,
//   dialect: 'postgres',
// })

const sequelize = new Sequelize('sqlite::memory:')

export default sequelize
