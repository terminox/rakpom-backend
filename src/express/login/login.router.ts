import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'

import UserLoginController, { LoginValidator, LoginUser } from './login.controller'
import SequelizeUserStore from './login_user_store.sequelize'
import SequelizeLoginService from './login_service.sequelize'

import sequelize from '../../sequelize/sequelize'

class BcryptHasher implements LoginValidator {
  async compareUser(user: LoginUser, password: string): Promise<void> {
    const hash: string = await bcrypt.hash(password, user.salt)
    await bcrypt.compare(hash, user.hash)
  }
}

export default class LoginRouter {

  private controller: UserLoginController 

  constructor(controller: UserLoginController) {
    this.controller = controller
  }
  
  async handle(req: Request, res: Response) {
    try {
      const email: string = req.body.email
      const password: string = req.body.password
      const credentials = await this.controller.login(email, password)
      res.status(201).json(credentials)
    } catch (err) {
      res.status(400).json({ error: (err as Error).message })
    }
  }

  static makeDefaultRouter(): LoginRouter {
    const hasher = new BcryptHasher()
    const store = new SequelizeUserStore(sequelize)
    const service = new SequelizeLoginService(sequelize)
    const controller = new UserLoginController(store, hasher, service)
    return new LoginRouter(controller)
  }
}