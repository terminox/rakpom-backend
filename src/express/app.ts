import express, { Application, NextFunction, Request, Response } from 'express'
import morgan from 'morgan'

import userRoutes from './users.router'
import shopRoutes from './shops.router'
import adminRoutes from './admins.router'

const app: Application = express()

app.enable('trust proxy')

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(req.url)
  next()
})

app.use(morgan('combined'))
app.use(express.json())

app.use('/api/v1/users', userRoutes)
app.use('/api/v1/shops', shopRoutes)
app.use('/api/v1/admins', adminRoutes)

// A dummy route just to make sure the server is running
app.use('/api/v1/hello', (req: Request, res: Response) => {
  res.send('Hello World')
})

export default app
