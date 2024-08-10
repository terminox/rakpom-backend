import { Request, Response } from 'express'

import BookingRequestsController from './booking_requests.controller'
import BookingRequestsPresenter from './booking_requests.presenter'
import SequelizeBookingRequestCreationService from './booking_request_creation_service.sequelize'

import sequelize from '../../../sequelize'

export default class BookingRequestsRouter {
  
  private controller: BookingRequestsController 
  
  constructor(controller: BookingRequestsController) {
    this.controller = controller
  }
  
  async handle(req: Request, res: Response) {
    try {
      const userID: string = res.locals.user.id 
      const shopID: string = req.body.shopID
      const date: Date = new Date(req.body.date)
      const startHour: number = parseInt(req.body.startHour)
      const startMinute: number = parseInt(req.body.startMinute)
      const endHour: number = parseInt(req.body.endHour)
      const endMinute: number = parseInt(req.body.endMinute)
      const result = await this.controller.createBookingRequest({
        userID,
        shopID,
        date,
        startHour,
        startMinute,
        endHour,
        endMinute
      })
      res.status(200).json(result)
    } catch (err) {
      res.status(400).json({ error: (err as Error).message })
    }
  }

  static makeDefaultRouter(): BookingRequestsRouter {
    const service = new SequelizeBookingRequestCreationService(sequelize)
    const presenter = new BookingRequestsPresenter()
    const controller = new BookingRequestsController(service, presenter)
    return new BookingRequestsRouter(controller)
  }
}
