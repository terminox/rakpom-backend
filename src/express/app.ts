import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'

import userRoutes from './users/users.router'
import shopRoutes from './shops/shops.router'

const app: Application = express()

app.enable('trust proxy')

app.use(morgan('combined'))
app.use(express.json())

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/shops', shopRoutes)
app.use('/api/v1/hello', (req: Request, res: Response) => {
  res.send('Hello World')
})

export default app
