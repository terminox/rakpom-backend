import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'

const app: Application = express()

app.enable('trust proxy')

app.use(morgan('combined'))
app.use(express.json())

// MARK: - Users

app.post('/api/v1/users/login', (req: Request, res: Response) => {
  // TODO
})

app.post('/api/v1/users/signup', (req: Request, res: Response) => {
  // TODO
})

app.post('/api/v1/users/signup/google', (req: Request, res: Response) => {
  // TODO
})

app.post('/api/v1/users/signup/line', (req: Request, res: Response) => {
  // TODO
})

app.post('/api/v1/users/signup/apple', (req: Request, res: Response) => {
  // TODO
})

app.get('/api/v1/users/profiles/:id', (req: Request, res: Response) => {
  // TODO
})

app.patch('/api/v1/users/profiles/:id', (req: Request, res: Response) => {
  // TODO
})

app.post('/api/v1/users/booking-requests', (req: Request, res: Response) => {
  // TODO
})

// MARK: - Shops

app.get('/api/v1/users/shops', (req: Request, res: Response) => {
  // TODO
})

app.get('/api/v1/users/shops/pages', (req: Request, res: Response) => {
  // TODO
})

app.get('/api/v1/users/shops/recent', (req: Request, res: Response) => {
  // TODO
})

app.get('/api/v1/users/shops/:id', (req: Request, res: Response) => {
  // TODO
})

app.post('/api/v1/shops/login', (req: Request, res: Response) => {
  // TODO
})

app.post('/api/v1/shops/signup', (req: Request, res: Response) => {
  // TODO
})

app.post('/api/v1/shops/signup/google', (req: Request, res: Response) => {
  // TODO
})

app.post('/api/v1/shops/signup/line', (req: Request, res: Response) => {
  // TODO
})

app.post('/api/v1/shops/signup/apple', (req: Request, res: Response) => {
  // TODO
})

app.get('/api/v1/shops/profiles/:id', (req: Request, res: Response) => {
  // TODO
})

app.patch('/api/v1/shops/profiles/:id', (req: Request, res: Response) => {
  // TODO
})

export default app
