import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Sequelize } from 'sequelize'

import sequelize from '../../sequelize'
import UserProfile from '../../sequelize/models/user_profile'

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

type AuthPayload = {
  userID: string
}

type AuthenticatedUser = {
  id: string
  email: string
  memberID: string
  fullName: string | null
  gender: string | null
  phoneNumber: string | null
}

export default async function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1]
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
    const result = jwt.verify(token, 'secret') as JwtPayload
    const payload: AuthPayload = { userID: result.data.id }
    return payload
  }
}

class SequelizeAuthenticationService implements AuthenticationService {

  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async authenticate(payload: AuthPayload): Promise<AuthenticatedUser> {
    const profile = await UserProfile.findOne({ where: { id: payload.userID } })
    if (profile == null) {
      throw new Error('User profile not found') // TODO
    }

    const user: AuthenticatedUser = {
      id: profile.id,
      email: profile.email,
      memberID: String(profile.memberID),
      fullName: profile.fullName,
      gender: profile.gender,
      phoneNumber: profile.phoneNumber,
    }

    return user
  }
}