import { Request, Response } from 'express'

import Controller from './controller'
import SequelizeUserProfileFetchingService from './fetching_service.sequelize'

import sequelize from '../../../sequelize'
import response from '../../../shared/response_object'

export default class Router {
  
  private controller: Controller 

  constructor(controller: Controller) {
    this.controller = controller
  }
  
  async handle(req: Request, res: Response) {
    try {
      const userID: string = res.locals.user.id
      const profile = await this.controller.getUserProfile(userID)
      res.status(200).json(response(profile))
    } catch (err) {
      res.status(400).json(response(null, err as Error))
    }
  }

  static makeDefaultRouter(): Router {
    const service = new SequelizeUserProfileFetchingService(sequelize)
    const controller = new Controller(service)
    return new Router(controller)
  }
}
