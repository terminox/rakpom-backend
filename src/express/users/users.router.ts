import { Router, Request, Response } from 'express'

import { userAuth } from '../middlewares/auth'

import LoginRouter from './login/login.router'
import OTPRouter from './otp/otp.router'
import SignupRouter from './signup/signup.router'
import PhoneSignupRouter from './signup_phone/signup.router'
import UserProfileRouter from './profiles/router'
import UserShopsRouter from './shops/shops.router'
import UserRecentShopsRouter from './recent_shops/shops.router'
import ShopDetailRouter from './shop_detail/shop_detail.router'
import ShopReviewsRouter from './shop_reviews/shop_reviews.router'
import BookingRequestsRouter from './booking_requests/booking_requests.router'
import NotificationListRouter from './notifications/router'
import BookingHistoryRouter from './booking_history_items/router'

const router = Router()

// // TODO: - Deprecate this route in favor of Firebase
// router.post('/login', (req: Request, res: Response) => {
//   const router = LoginRouter.makeDefaultRouter()
//   router.handle(req, res)
// })

// // TODO: - Deprecate this route in favor of Firebase
// router.post('/otps', (req: Request, res: Response) => {
//   const router = OTPRouter.makeDefaultRouter()
//   router.handle(req, res)
// })

// // TODO: - Deprecate this route in favor of Firebase
// router.post('/signup', (req: Request, res: Response) => {
//   const router = SignupRouter.makeDefaultRouter()
//   router.handle(req, res)
// })

// // TODO: - Deprecate this route in favor of Firebase
// router.post('/signup/phone', (req: Request, res: Response) => {
//   const router = PhoneSignupRouter.makeDefaultRouter()
//   router.handle(req, res)
// })

router.post('/signup/google', (req: Request, res: Response) => {
  // TODO
})

router.post('/signup/line', (req: Request, res: Response) => {
  // TODO
})

router.post('/signup/apple', (req: Request, res: Response) => {
  // TODO
})

router.get('/profiles/me', userAuth, (req: Request, res: Response) => {
  const router = UserProfileRouter.makeDefaultRouter()
  router.handle(req, res)
})

router.patch('/profiles/me', userAuth, (req: Request, res: Response) => {
  // TODO
})

router.post('/booking-requests', userAuth, (req: Request, res: Response) => {
  const router = BookingRequestsRouter.makeDefaultRouter()
  router.handle(req, res)
})

router.get('/shops/pages', userAuth, (req: Request, res: Response) => {
  const router = UserShopsRouter.makeDefaultRouter()
  router.handle(req, res)
})

router.get('/shops/recent', userAuth, (req: Request, res: Response) => {
  const router = UserRecentShopsRouter.makeDefaultRouter()
  router.handle(req, res)
})

router.get('/shops/:id', userAuth, (req: Request, res: Response) => {
  const router = ShopDetailRouter.makeDefaultRouter()
  router.handle(req, res)
})

router.get('/shops/:id/reviews', userAuth, (req: Request, res: Response) => {
  const router = ShopReviewsRouter.makeDefaultRouter()
  router.handle(req, res)
})

router.get('/notifications/pages', userAuth, (req: Request, res: Response) => {
  const router = NotificationListRouter.makeDefaultRouter()
  router.handle(req, res)
})

router.get('/booking_history_items/pages', userAuth, (req: Request, res: Response) => {
  const router = BookingHistoryRouter.makeDefaultRouter()
  router.handle(req, res)
})

export default router
