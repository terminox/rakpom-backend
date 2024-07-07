import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Sequelize } from 'sequelize'

import sequelize from '../../sequelize/sequelize'

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

interface TokenDecoder {
  decode(token: string): Promise<AuthPayload>
}

interface AuthenticationService {
  authenticate(payload: AuthPayload): Promise<AuthenticatedUser>
}

type AuthPayload = {}

type AuthenticatedUser = {}

export default async function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const decoder = new JWTDecoder()
  const service = new SequelizeAuthenticationService(sequelize)
  const controller = new AuthenticationController(decoder, service)
  const user = await controller.authenticate(token)
  res.locals.user = user
  next()
}

class JWTDecoder implements TokenDecoder {
  async decode(token: string): Promise<AuthPayload> {
    // TODO
    return jwt.verify(token, 'secret') as AuthPayload
  }
}

class SequelizeAuthenticationService implements AuthenticationService {

  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async authenticate(payload: AuthPayload): Promise<AuthenticatedUser> {
    // TODO
    return {}
  }
}