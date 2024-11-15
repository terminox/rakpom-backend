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
      avatarURL: profile.avatarURL,
      totalPoints: 1200 // TODO
    }
  }
}
