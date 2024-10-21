import { Sequelize } from 'sequelize'
import parsePhoneNumber from 'libphonenumber-js'

import { AuthenticationService, AuthPayload, AuthenticatedUser } from './core'

import FirebasePhoneAuthItem from '../../../sequelize/models/firebase_phone_auth_item'
import UserProfile from '../../../sequelize/models/user_profile'

type Implements<T, U extends T> = U

type User = Implements<AuthenticatedUser, {
  id: string
  email: string
  memberID: string | null
  fullName: string | null
  gender: string | null
  phoneNumber: string | null
}>

export default class SequelizeUserFirebaseAuthService implements AuthenticationService {

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

    const profile = await UserProfile.findOne({ where: { id: authItem.authorizableID } })
    if (profile == null) {
      throw new Error('User profile not found') // TODO
    }

    const user: User = {
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