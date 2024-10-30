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

const router = Router()

router.post('/signup/phone', async (req: Request, res: Response) => {
  try {
    const phone = req.body.phone
    const service = new SequelizeFirebasePhoneSignupService(sequelize)
    const result = await service.signUp({ phone })
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

router.get('/profiles/me', shopAuth, (req: Request, res: Response) => {
  const router = ShopProfileRouter.makeDefaultRouter()
  router.handle(req, res)
})

router.patch('/profiles/me', shopAuth, (req: Request, res: Response) => {
  const router = ShopProfileUpdateRouter.makeDefaultRouter()
  router.handle(req, res)
})

router.get('/transactions', shopAuth, (req: Request, res: Response) => {
  // TODO
  res.status(200).json(response([
    {
      "title": "ตัดผมฟรี 1",
      "description": "ตัดผมฟรี สำหรับลูกค้าใหม่",
      "dateString": "12/09/2556",
      "amountString": "฿150",
      "imageURL": "https://unsplash.com/photos/grayscale-photo"
    },
    {
      "title": "ตัดผมฟรี 2",
      "description": "ตัดผมฟรี สำหรับลูกค้าใหม่",
      "dateString": "12/09/2556",
      "amountString": "฿150",
      "imageURL": "https://unsplash.com/photos/grayscale-photo"
    },
    {
      "title": "ตัดผมฟรี 3",
      "description": "ตัดผมฟรี สำหรับลูกค้าใหม่",
      "dateString": "12/09/2556",
      "amountString": "฿150",
      "imageURL": "https://unsplash.com/photos/grayscale-photo"
    },
    {
      "title": "ตัดผมฟรี 4",
      "description": "ตัดผมฟรี สำหรับลูกค้าใหม่",
      "dateString": "12/09/2556",
      "amountString": "฿150",
      "imageURL": "https://unsplash.com/photos/grayscale-photo"
    },
    {
      "title": "ตัดผมฟรี 4",
      "description": "ตัดผมฟรี สำหรับลูกค้าใหม่",
      "dateString": "12/09/2556",
      "amountString": "฿150",
      "imageURL": "https://unsplash.com/photos/grayscale-photo"
    }
  ]))
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

router.get('/withdraw-history-items', shopAuth, (req: Request, res: Response) => {
  // TODO
})

router.get('/reviews', shopAuth, (req: Request, res: Response) => {
  // TODO
  res.status(200).json(response([
    {
      id: '1',
      reviewerName: 'Alice',
      score: 5,
      text: 'Good',
      dateString: '2021-01-01',
      reviewerImageURL: 'https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=3486&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: '2',
      reviewerName: 'Bob',
      score: 4,
      text: 'Not bad',
      dateString: '2021-01-02',
      reviewerImageURL: 'https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=3486&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: '3',
      reviewerName: 'Charlie',
      score: 3,
      text: 'So so',
      dateString: '2021-01-03',
      reviewerImageURL: 'https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=3486&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: '4',
      reviewerName: 'David',
      score: 2,
      text: 'Bad',
      dateString: '2021-01-04',
      reviewerImageURL: 'https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=3486&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: '5',
      reviewerName: 'Eve',
      score: 1,
      text: 'Very bad',
      dateString: '2021-01-05',
      reviewerImageURL: 'https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=3486&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  ]))
})


export default router
