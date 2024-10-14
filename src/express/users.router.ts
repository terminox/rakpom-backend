import { Router, Request, Response } from 'express'

import { userAuth } from './middlewares/auth'

import sequelize from '../sequelize'
import response from '../shared/response_object'

import LoginRouter from './users/login/login.router'
import OTPRouter from './users/otp/otp.router'
import SignupRouter from './users/signup/signup.router'
import PhoneSignupRouter from './users/signup_phone/signup.router'
import UserProfileRouter from './users/profiles/router'
import UserShopsRouter from './users/shops/shops.router'
import UserRecentShopsRouter from './users/recent_shops/shops.router'
import ShopDetailRouter from './users/shop_detail/shop_detail.router'
import ShopReviewsRouter from './users/shop_reviews/shop_reviews.router'
import BookingRequestCreationRouter from './users/booking_request_creation/booking_request_creation.router'
import NotificationListRouter from './users/notifications/router'
import BookingHistoryRouter from './users/booking_history_items/router'

import SequelizeFirebasePhoneSignupService from './users/signup_firebase_phone/firebase_phone_signup_service.sequelize'
import SequelizeQRPaymentService from './payment/qr/qr_payment_service.sequelize'
import SequelizeCashPaymentService from './payment/cash/cash_payment_service.sequelize'

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

router.post('/signup/firebase/phone', async (req: Request, res: Response) => {
  try {
    const firebaseToken = req.body.firebaseToken
    const phone = req.body.phone
    const service = new SequelizeFirebasePhoneSignupService(sequelize)
    const result = await service.signUp({ firebaseToken, phone })
    res.status(200).json(response(result))
  } catch (err) {
    res.status(400).json(response(null, err as Error))
  }
})

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
  const router = BookingRequestCreationRouter.makeDefaultRouter()
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

// Submit a QR payment
router.post('/payment/qr', userAuth, async (req: Request, res: Response) => {
  try {
    const userID = res.locals.user.id
    const shopCode = req.body.shopCode
    const amount = Number(req.body.amount)
    const service = new SequelizeCashPaymentService(sequelize)
    const result = await service.submitCashPayment({ userID, shopCode, amount })
    res.status(200).json(response(result))
  } catch (err) {
    res.status(400).json(response(null, err as Error))
  }
})

// Submit a cash payment
router.post('/payment/cash', userAuth, async (req: Request, res: Response) => {
  try {
    const userID = res.locals.user.id
    const shopCode = req.body.shopCode
    const amount = Number(req.body.amount)
    const service = new SequelizeCashPaymentService(sequelize)
    const result = await service.submitCashPayment({ userID, shopCode, amount })
    res.status(200).json(response(result))
  } catch (err) {
    res.status(400).json(response(null, err as Error))
  }
})

export default router
