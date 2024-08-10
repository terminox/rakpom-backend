import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'

import ShopSignupController, { Hasher, HashResult } from './signup.controller'
import SequelizeShopStore from './shop_store.sequelize'

import sequelize from '../../../sequelize'
import JWTCoder from '../../../shared/jwt/coder'

class BcryptHasher implements Hasher {
  async hash(s: string): Promise<HashResult> {
    const salt: string = await bcrypt.genSalt(10)
    const hash: string = await bcrypt.hash(s, salt)
    return { hash, salt }
  }
}

export default class SignupRouter {

  private controller: ShopSignupController

  constructor(controller: ShopSignupController) {
    this.controller = controller
  }
  
  async handle(req: Request, res: Response) {
    try {
      const email: string = req.body.email
      const password: string = req.body.password
      const credentials = await this.controller.signup(email, password)
      res.status(201).json(credentials)
    } catch (err) {
      res.status(400).json({ error: (err as Error).message })
    }
  }

  static makeDefaultRouter(): SignupRouter {
    const hasher = new BcryptHasher()
    const store = new SequelizeShopStore(sequelize)
    const encoder = new JWTCoder()
    const controller = new ShopSignupController(hasher, store, encoder)
    return new SignupRouter(controller)
  }
}