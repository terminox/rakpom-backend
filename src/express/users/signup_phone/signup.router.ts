import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'

import UserSignupController, { Hasher, HashResult } from './signup.controller'
import SequelizeUserStore from './user_store.sequelize'

import sequelize from '../../../sequelize'
import JWTCoder from '../../../shared/jwt/coder'
import response from '../../../shared/response_object'

class BcryptHasher implements Hasher {
  async hash(s: string): Promise<HashResult> {
    const salt: string = await bcrypt.genSalt(10)
    const hash: string = await bcrypt.hash(s, salt)
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
      // TODO: - Change this to the actual phone number signup
      // const email: string = req.body.email
      // const password: string = req.body.password
      const email = "test1@rakpom.dev"
      const password = "qwerqwerqwer"
      const credentials = await this.controller.signup(email, password)
      res.status(201).json(response({ type: "profile", accessToken: credentials.accessToken }))
    } catch (err) {
      res.status(400).json(response(null, err as Error))
    }
  }

  static makeDefaultRouter(): SignupRouter {
    const hasher = new BcryptHasher()
    const store = new SequelizeUserStore(sequelize)
    const encoder = new JWTCoder()
    const controller = new UserSignupController(hasher, store, encoder)
    return new SignupRouter(controller)
  }
}