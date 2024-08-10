import { Sequelize } from 'sequelize'
import { ulid } from 'ulid'

import { UserStore, SignupPayload, SignupResult } from './signup.controller'

import BasicAuthItem from '../../../sequelize/models/basic_auth_item'
import UserProfile from '../../../sequelize/models/user_profile'

export default class SequelizeUserStore implements UserStore {

  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async storeUser(payload: SignupPayload): Promise<SignupResult> {
    const transaction = await this.sequelize.transaction()

    try {
      const profile = await UserProfile.create({
        id: ulid(),
        email: payload.email,
      }, {
        transaction
      })
  
      await BasicAuthItem.create({
        id: ulid(),
        email: payload.email,
        hash: payload.hash,
        salt: payload.salt,
        authorizableID: profile.id,
      }, {
        transaction
      })
  
      await transaction.commit()

      return {
        id: profile.id,
        email: profile.email,
        memberID: String(profile.memberID),
        fullName: profile.fullName,
        gender: profile.gender,
        phoneNumber: profile.phoneNumber,
      }
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  }
}