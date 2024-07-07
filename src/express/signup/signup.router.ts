import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'

import UserSignupController, { Hasher, HashResult } from './signup.controller'
import SequelizeUserStore from './user_store.sequelize'

import sequelize from '../../sequelize/sequelize'

class BcryptHasher implements Hasher {
  async hash(s: string): Promise<HashResult> {
    const salt: string = bcrypt.genSaltSync(10)
    const hash: string = bcrypt.hashSync(s, salt)
    return { hash, salt }
  }
}

export default class SignupRouter {

  private controller: UserSignupController

  constructor(controller: UserSignupController) {
    this.controller = controller
  }
  
  async handle(req: Request, res: Response) {
    try {
      const email: string = req.body.email
      const password: string = req.body.password
      const credential = await this.controller.signup(email, password)
      res.status(201).json(credential)
    } catch (err) {
      res.status(400).json({ error: (err as Error).message })
    }
  }

  static makeDefaultRouter(): SignupRouter {
    const hasher = new BcryptHasher()
    const store = new SequelizeUserStore(sequelize)
    const controller = new UserSignupController(hasher, store)
    return new SignupRouter(controller)
  }
}