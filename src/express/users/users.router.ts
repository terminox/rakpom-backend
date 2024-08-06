import { Router, Request, Response } from 'express'

import { userAuth } from '../middlewares/auth'

import LoginRouter from './login/login.router'
import SignupRouter from './signup/signup.router'
import UserShopsRouter from '../shops/shops.router'
import UserRecentShopsRouter from './recent_shops/shops.router'
import ShopDetailRouter from './shop_detail/shop_detail.router'
import ShopReviewsRouter from './shop_reviews/shop_reviews.router'
import BookingRequestsRouter from './booking_requests/booking_requests.router'

const router = Router()

router.post('/login', (req: Request, res: Response) => {
  const router = LoginRouter.makeDefaultRouter()
  router.handle(req, res)
})

router.post('/signup', (req: Request, res: Response) => {
  const router = SignupRouter.makeDefaultRouter()
  router.handle(req, res)
})

// router.post('/signup/google', (req: Request, res: Response) => {
//   // TODO
// })

// router.post('/signup/line', (req: Request, res: Response) => {
//   // TODO
// })

// router.post('/signup/apple', (req: Request, res: Response) => {
//   // TODO
// })

router.get('/profiles/me', userAuth, (req: Request, res: Response) => {
  // TODO
})

router.patch('/profiles/me', userAuth, (req: Request, res: Response) => {
  // TODO
})

router.post('/booking-requests', (req: Request, res: Response) => {
  const router = BookingRequestsRouter.makeDefaultRouter()
  router.handle(req, res)
})

router.get('/shops/pages', userAuth, (req: Request, res: Response) => {
  const router = UserShopsRouter.makeDefaultRouter()
  router.handle(req, res)
})

router.get('/shops/recent', (req: Request, res: Response) => {
  const router = UserRecentShopsRouter.makeDefaultRouter()
  router.handle(req, res)
})

router.get('/shops/:id', (req: Request, res: Response) => {
  const router = ShopDetailRouter.makeDefaultRouter()
  router.handle(req, res)
})

router.get('/shops/:id/reviews', (req: Request, res: Response) => {
  const router = ShopReviewsRouter.makeDefaultRouter()
  router.handle(req, res)
})

export default router
