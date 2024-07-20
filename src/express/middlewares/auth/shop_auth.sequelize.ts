import { Sequelize } from 'sequelize'

import { AuthenticationService, AuthPayload, AuthenticatedUser } from './core'

import Shop from '../../../sequelize/models/shop'

type Implements<T, U extends T> = U

type AuthenticatedShop = Implements<AuthenticatedUser, {
  id: string
}>

export default class SequelizeShopAuthService implements AuthenticationService {

  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async authenticate(payload: AuthPayload): Promise<AuthenticatedUser> {
    const profile = await Shop.findOne({ where: { id: payload.id } })
    if (profile == null) {
      throw new Error('User profile not found') // TODO
    }

    const user: AuthenticatedShop = {
      id: profile.id,
    }

    return user
  }
}