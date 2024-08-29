import _ from 'lodash'
import { Sequelize } from 'sequelize'

import { UserProfileFetchingService, UserProfile } from './controller'

import SequelizeUserProfile from '../../../sequelize/models/user_profile'

export default class SequelizeUserProfileFetchingService implements UserProfileFetchingService {

  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async getUserProfile(id: string): Promise<UserProfile> {
    const profile = await SequelizeUserProfile.findOne({
      where: { id }
    })

    if (profile == null) {
      throw new Error('User profile not found') // TODO
    }

    return {
      id: profile.id,
      email: profile.email,
      memberID: String(profile.memberID),
      fullName: profile.fullName,
      gender: profile.gender,
      phoneNumber: profile.phoneNumber,
      avatarURL: 'https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=3486&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' // TODO
    }
  }
}
