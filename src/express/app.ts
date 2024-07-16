import express, { Application, Request, Response } from 'express'
import morgan from 'morgan'

import auth from './middlewares/auth'

import LoginRouter from './login/login.router'
import SignupRouter from './signup/signup.router'
import UserShopsRouter from './shops/shops.router'
import UserRecentShopsRouter from './recent_shops/shops.router'
import ShopDetailRouter from './shop_detail/shop_detail.router'
import ShopReviewsRouter from './shop_reviews/shop_reviews.router'
import BookingRequestsRouter from './booking_requests/booking_requests.router'

const app: Application = express()

app.enable('trust proxy')

app.use(morgan('combined'))
app.use(express.json())

// MARK: - Users

app.post('/api/v1/users/login', (req: Request, res: Response) => {
  const router = LoginRouter.makeDefaultRouter()
  router.handle(req, res)
})

app.post('/api/v1/users/signup', (req: Request, res: Response) => {
  const router = SignupRouter.makeDefaultRouter()
  router.handle(req, res)
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
  const router = BookingRequestsRouter.makeDefaultRouter()
  router.handle(req, res)
})

app.get('/api/v1/users/shops/pages', auth, (req: Request, res: Response) => {
  const router = UserShopsRouter.makeDefaultRouter()
  router.handle(req, res)
})

app.get('/api/v1/users/shops/recent', (req: Request, res: Response) => {
  const router = UserRecentShopsRouter.makeDefaultRouter()
  router.handle(req, res)
})

app.get('/api/v1/users/shops/:id', (req: Request, res: Response) => {
  const router = ShopDetailRouter.makeDefaultRouter()
  router.handle(req, res)
})

app.get('/api/v1/users/shops/:id/reviews', (req: Request, res: Response) => {
  const router = ShopReviewsRouter.makeDefaultRouter()
  router.handle(req, res)
})

// MARK: - Shops

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
