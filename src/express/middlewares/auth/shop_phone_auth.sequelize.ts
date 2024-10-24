import { Sequelize } from 'sequelize'
import parsePhoneNumber from 'libphonenumber-js'

import { AuthenticationService, AuthPayload, AuthenticatedUser } from './core'

import FirebasePhoneAuthItem from '../../../sequelize/models/firebase_phone_auth_item'
import Shop from '../../../sequelize/models/shop'

type Implements<T, U extends T> = U

type AuthenticatedShop = Implements<AuthenticatedUser, {
  id: string
}>

export default class SequelizeShopPhoneAuthService implements AuthenticationService {

  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async authenticate(payload: AuthPayload): Promise<AuthenticatedUser> {
    const phone = payload.id
    const formattedPhone = parsePhoneNumber(phone, 'TH')?.formatNational()
    const authItem = await FirebasePhoneAuthItem.findOne({ where: { phone: formattedPhone } }) 
    if (authItem == null) {
      throw new Error('User profile not found') // TODO
    }

    const profile = await Shop.findOne({ where: { id: authItem.authorizableID } })
    if (profile == null) {
      throw new Error('User profile not found') // TODO
    }

    const user: AuthenticatedShop = {
      id: profile.id,
    }

    return user
  }
}