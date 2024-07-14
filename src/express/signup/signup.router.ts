import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import UserSignupController, { Hasher, HashResult, SignupResult, SignupCredentials, SignupCredentialEncoder } from './signup.controller'
import SequelizeUserStore from './user_store.sequelize'

import sequelize from '../../sequelize'

class BcryptHasher implements Hasher {
  async hash(s: string): Promise<HashResult> {
    const salt: string = await bcrypt.genSalt(10)
    const hash: string = await bcrypt.hash(s, salt)
    return { hash, salt }
  }
}

class JWTEncoder implements SignupCredentialEncoder {
  async encode(result: SignupResult): Promise<SignupCredentials> {
    const accessToken = await jwt.sign({ data: result }, 'secret')
    const credentials = { accessToken }
    return credentials
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
      const credentials = await this.controller.signup(email, password)
      res.status(201).json(credentials)
    } catch (err) {
      res.status(400).json({ error: (err as Error).message })
    }
  }

  static makeDefaultRouter(): SignupRouter {
    const hasher = new BcryptHasher()
    const store = new SequelizeUserStore(sequelize)
    const encoder = new JWTEncoder()
    const controller = new UserSignupController(hasher, store, encoder)
    return new SignupRouter(controller)
  }
}