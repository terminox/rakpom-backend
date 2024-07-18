import express, { Application } from 'express'
import morgan from 'morgan'

import userRoutes from './users.router'
import shopRoutes from './shops.router'

const app: Application = express()

app.enable('trust proxy')

app.use(morgan('combined'))
app.use(express.json())

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/shops', shopRoutes)

export default app
