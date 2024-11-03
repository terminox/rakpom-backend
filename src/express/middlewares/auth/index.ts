import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import admin from 'firebase-admin'

import { TokenDecoder, AuthenticationService, AuthPayload, AuthenticatedUser } from './core'

import SequelizeUserPhoneAuthService from './user_phone_auth.sequelize'
import SequelizeShopPhoneAuthService from './shop_phone_auth.sequelize'

import sequelize from '../../../sequelize'

class AuthenticationController {

  private decoder: TokenDecoder
  private service: AuthenticationService
  
  constructor(decoder: TokenDecoder, service: AuthenticationService) {
    this.decoder = decoder
    this.service = service
  }

  async authenticate(token: string): Promise<AuthenticatedUser> {
    const payload: AuthPayload = await this.decoder.decode(token)
    const user: AuthenticatedUser = await this.service.authenticate(payload)
    return user
  }
}

class FirebaseAuthDecoder implements TokenDecoder {
  async decode(token: string): Promise<AuthPayload> {
    const result = await admin.auth().verifyIdToken(token)
    return { id: result.phone_number ?? '' } 
  }
}

export function authMiddleware(decoder: TokenDecoder, service: AuthenticationService): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  return async function (req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      res.status(401).json({ data: null, error: 'Unauthorized' }) // TODO
      return
    }

    const controller = new AuthenticationController(decoder, service)
    const user = await controller.authenticate(token)
    res.locals.user = user
    next()
  }
}

export async function userAuth(req: Request, res: Response, next: NextFunction) {
  const decoder = new FirebaseAuthDecoder()
  const service = new SequelizeUserPhoneAuthService(sequelize)
  const middleware = authMiddleware(decoder, service)
  return middleware(req, res, next)
}

export async function shopAuth(req: Request, res: Response, next: NextFunction) {
  const decoder = new FirebaseAuthDecoder()
  const service = new SequelizeShopPhoneAuthService(sequelize)
  const middleware = authMiddleware(decoder, service)
  return middleware(req, res, next)
}

export { TokenDecoder, AuthenticationService, AuthPayload, AuthenticatedUser }
