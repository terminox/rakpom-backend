import { Router, Request, Response } from 'express'

import { shopAuth } from '../middlewares/auth'

import sequelize from '../../sequelize'
import response from '../../shared/response_object'

import LoginRouter from './shop_login/login.router'
import SignupRouter from './shop_signup/signup.router'
import ShopProfileRouter from './shop_profile/shop_profile.router'
import ShopProfileUpdateRouter from './shop_profile_update/router'
import OTPRouter from '../users/otp/otp.router'
import PhoneSignupRouter from '../users/signup_phone/signup.router'

import SequelizeRejectBookingRequestService from './reject_booking_request/reject_booking_request_service.sequelize'
import SequelizeAcceptBookingRequestService from './accept_booking_request/accept_booking_request_service.sequelize'

const router = Router()

// TODO: - Deprecate this route in favor of Firebase
router.post('/login', (req: Request, res: Response) => {
  const router = LoginRouter.makeDefaultRouter()
  router.handle(req, res)
})

// TODO: - Deprecate this route in favor of Firebase
router.post('/otps', (req: Request, res: Response) => {
  const router = OTPRouter.makeDefaultRouter()
  router.handle(req, res)
})

// TODO: - Deprecate this route in favor of Firebase
router.post('/signup', (req: Request, res: Response) => {
  const router = SignupRouter.makeDefaultRouter()
  router.handle(req, res)
})

// TODO: - Deprecate this route in favor of Firebase
router.post('/signup/phone', (req: Request, res: Response) => {
  const router = PhoneSignupRouter.makeDefaultRouter()
  router.handle(req, res)
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

// Reject a booking request
router.post('/booking-requests/:id/reject', shopAuth, async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const service = new SequelizeRejectBookingRequestService(sequelize)
    const result = await service.rejectBookingRequest({ id })
    res.status(200).json(response(result))
  } catch (err) {
    res.status(400).json(response(null, err as Error))
  }
})

// Accept a booking request
router.post('/booking-requests/:id/accept', shopAuth, async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const service = new SequelizeAcceptBookingRequestService(sequelize)
    const result = await service.acceptBookingRequest({ id })
    res.status(200).json(response(result))
  } catch (err) {
    res.status(400).json(response(null, err as Error))
  }
})

export default router
