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
import SequelizeUserProfileUpdateService from './users/profiles/user_profile_update_service.sequelize'
import SequelizeReviewCreationService from './users/reviews/review_creation_service.sequelize'

const router = Router()

router.post('/signup/phone', async (req: Request, res: Response) => {
  try {
    const phone = req.body.phone
    const service = new SequelizeFirebasePhoneSignupService(sequelize)
    const result = await service.signUp({ phone })
    res.status(201).json(response(result))
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

router.patch('/profiles/me', userAuth, async (req: Request, res: Response) => {
  try {
    const userId = res.locals.user.id
    const updates = {
      avatarURL: req.body.avatarURL,
      fullName: req.body.fullName,
      gender: req.body.gender?.toLowerCase(),
      age: req.body.age,
      phone: req.body.phone,
      email: req.body.email
    }
    const service = new SequelizeUserProfileUpdateService(sequelize)
    await service.updateProfile(userId, updates)
    res.status(204).end()
  } catch (err) {
    res.status(400).json(response(null, err as Error))
  }
})

router.get('/prizes', userAuth, (req: Request, res: Response) => {
  // TODO
  res.status(200).json(response([
    {
      title: 'รหัสงวดวันที่ 20 ม.ค. 66',
      value: '2 1 1'
    },
    {
      title: 'รหัสงวดวันที่ 02 ม.ค. 66',
      value: '5 9 2'
    }
  ]))
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

router.post('/reviews', userAuth, async (req: Request, res: Response) => {
  try {
    const userID = res.locals.user.id
    const { shopCode, score, content } = req.body
    const service = new SequelizeReviewCreationService(sequelize)
    await service.createReview({ userID, shopCode, score, content })
    res.status(201).end()
  } catch (err) {
    res.status(400).json(response(null, err as Error))
  }
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
    const imageURL = req.body.imageURL
    const shopCode = req.body.shopCode
    const amount = Number(req.body.amount)
    const service = new SequelizeQRPaymentService(sequelize)
    await service.submitQRPayment({ userID, shopCode, amount, imageURL })
    res.status(201).end()
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
    await service.submitCashPayment({ userID, shopCode, amount })
    res.status(201).end()
  } catch (err) {
    res.status(400).json(response(null, err as Error))
  }
})

export default router
