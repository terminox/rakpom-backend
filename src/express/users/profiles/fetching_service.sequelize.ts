import _ from 'lodash'
import { Sequelize } from 'sequelize'

import { UserProfileFetchingService, UserProfile } from './controller'

import SequelizeUserProfile from '../../../sequelize/models/user_profile'
import PointTransaction from '../../../sequelize/models/point_transaction'

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

    const pointTransactions = await PointTransaction.findAll({
      where: { userID: id },
      order: [['createdAt', 'DESC']]
    })

    const totalPoints = pointTransactions.reduce((sum, point) => sum + point.value, 0)

    return {
      id: profile.id,
      email: profile.email,
      memberID: String(profile.memberID),
      fullName: profile.fullName,
      gender: profile.gender,
      phoneNumber: profile.phoneNumber,
      avatarURL: profile.avatarURL,
      totalPoints: totalPoints,
      points: pointTransactions.map((point) => ({
        id: point.id,
        value: point.value,
        dateString: point.createdAt.toLocaleString('th-TH', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit'
        })
      }))
    }
  }
}
