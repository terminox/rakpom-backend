import { Request, Response } from 'express'

import Controller from './otp.controller'

import response from '../../../shared/response_object'

export default class OTPRouter {

  private controller: Controller 

  constructor(controller: Controller) {
    this.controller = controller
  }
  
  async handle(req: Request, res: Response) {
    try {
      const phone: string = req.body.phone
      const otpResponse = await this.controller.requestPhoneSignupOTP(phone)
      res.status(201).json(response(otpResponse))
    } catch (err) {
      res.status(400).json(response(null, err as Error))
    }
  }

  static makeDefaultRouter(): OTPRouter {
    const controller = new Controller()
    return new OTPRouter(controller)
  }
}