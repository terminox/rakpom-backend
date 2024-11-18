import { Router, Request, Response } from 'express'

import { shopAuth } from './middlewares/auth'

import sequelize from '../sequelize'
import response from '../shared/response_object'

import LoginRouter from './shops/shop_login/login.router'
import SignupRouter from './shops/shop_signup/signup.router'
import ShopProfileRouter from './shops/shop_profile/shop_profile.router'
import ShopProfileUpdateRouter from './shops/shop_profile_update/router'

import OTPRouter from './users/otp/otp.router'
import PhoneSignupRouter from './users/signup_phone/signup.router'

import SequelizeFirebasePhoneSignupService from './shops/signup_phone/firebase_phone_signup_service.sequelize'
import SequelizeBookingRequestFetchingService from './shops/booking_requests/booking_request_fetching_service.sequelize'
import SequelizeRejectBookingRequestService from './shops/reject_booking_request/reject_booking_request_service.sequelize'
import SequelizeAcceptBookingRequestService from './shops/accept_booking_request/accept_booking_request_service.sequelize'
import SequelizeBalanceInfoService from './shops/balance_info/balance_info_service.sequelize'
import SequelizeWithdrawRequestCreationService from './shops/withdraw_request/withdraw_request_creation_service.sequelize'
import SequelizeWithdrawRequestFetchingService from './shops/withdraw_request/withdraw_request_fetching_service.sequelize'
import SequelizeTransactionFetchingService from './shops/transactions/transaction_fetching_service.sequelize'
import SequelizeShopReviewsFetchingService from './users/shop_reviews/shop_reviews_fetching_service.sequelize'

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

router.get('/profiles/me', shopAuth, (req: Request, res: Response) => {
  const router = ShopProfileRouter.makeDefaultRouter()
  router.handle(req, res)
})

router.patch('/profiles/me', shopAuth, (req: Request, res: Response) => {
  const router = ShopProfileUpdateRouter.makeDefaultRouter()
  router.handle(req, res)
})

router.get('/transactions', shopAuth, async (req: Request, res: Response) => {
  try {
    const shopID: string = res.locals.user.id
    const service = new SequelizeTransactionFetchingService(sequelize)
    const transactions = await service.fetchAllTransactions(shopID)
    res.status(200).json(response(transactions))
  } catch (err) {
    res.status(400).json(response(null, err as Error))
  }
})

// View pending booking requests
router.get('/booking-requests', shopAuth, async (req: Request, res: Response) => {
  try {
    const shopID: string = res.locals.user.id
    const service = new SequelizeBookingRequestFetchingService(sequelize)
    const result = await service.fetchPendingBookingRequests(shopID)
    res.status(200).json(response(result))
  } catch (err) {
    res.status(400).json(response(null, err as Error))
  }
})

// Reject a booking request
router.post('/booking-requests/:id/reject', shopAuth, async (req: Request, res: Response) => {
  try {
    // Reject booking
    const id = req.params.id
    const rejectBookingService = new SequelizeRejectBookingRequestService(sequelize)
    await rejectBookingService.rejectBookingRequest({ id })

    // Fetch bookings
    const shopID: string = res.locals.user.id
    const fetchingService = new SequelizeBookingRequestFetchingService(sequelize)
    const result = await fetchingService.fetchPendingBookingRequests(shopID)
    res.status(200).json(response(result))
  } catch (err) {
    res.status(400).json(response(null, err as Error))
  }
})

// Accept a booking request
router.post('/booking-requests/:id/accept', shopAuth, async (req: Request, res: Response) => {
  try {
    // Accept booking
    const id = req.params.id
    const acceptBookingService = new SequelizeAcceptBookingRequestService(sequelize)
    await acceptBookingService.acceptBookingRequest({ id })

    // Fetch bookings
    const shopID: string = res.locals.user.id
    const fetchingService = new SequelizeBookingRequestFetchingService(sequelize)
    const result = await fetchingService.fetchPendingBookingRequests(shopID)
    res.status(200).json(response(result))
  } catch (err) {
    res.status(400).json(response(null, err as Error))
  }
})

router.get('/balance-info-items', shopAuth, async (req: Request, res: Response) => {
  try {
    const shopID: string = res.locals.user.id
    const service = new SequelizeBalanceInfoService(sequelize)
    const result = await service.fetchBalanceInfo(shopID)
    res.status(200).json(response(result))
  } catch (err) {
    res.status(400).json(response(null, err as Error))
  }
})

router.get('/reviews', shopAuth, async (req: Request, res: Response) => {
  try {
    const shopID: string = res.locals.user.id
    const service = new SequelizeShopReviewsFetchingService(sequelize)
    const shopReviews = await service.getShopReviews(shopID)
    res.status(200).json(response(shopReviews))
  } catch (err) {
    res.status(400).json(response(null, err as Error))
  }
})

router.post('/withdraw-requests', shopAuth, async (req: Request, res: Response) => {
  try {
    const shopID: string = res.locals.user.id
    const service = new SequelizeWithdrawRequestCreationService(sequelize)
    const result = await service.createWithdrawRequest({ shopID })
    res.status(201).json(response(result))
  } catch (err) {
    res.status(400).json(response(null, err as Error))
  }
})

router.get('/withdraw-requests', shopAuth, async (req: Request, res: Response) => {
  try {
    const shopID: string = res.locals.user.id
    const service = new SequelizeWithdrawRequestFetchingService(sequelize)
    const result = await service.fetchWithdrawRequests(shopID)
    res.status(200).json(response(result))
  } catch (err) {
    res.status(400).json(response(null, err as Error))
  }
})

export default router
