import { Sequelize } from 'sequelize'
import { ulid } from 'ulid'

import { UserStore, SignupPayload, SignupResult } from './signup.controller'

import BasicAuthItem from '../../sequelize/models/basic_auth_item'
import UserProfile from '../../sequelize/models/user_profile'

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
  
      const authItem = await BasicAuthItem.create({
        id: ulid(),
        email: payload.email,
        hash: payload.hash,
        salt: payload.salt,
        userProfileID: profile.id,
      }, {
        transaction
      })
  
      await transaction.commit()
      return authItem
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  }
}