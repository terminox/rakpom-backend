import { Sequelize } from 'sequelize'

import UserProfile from '../../../sequelize/models/user_profile'

class UserProfileUpdateService {
  constructor(private sequelize: Sequelize) {}

  async updateProfile(userId: number, updates: Partial<UserProfile>) {
    try {
      const [updated] = await UserProfile.update(updates, {
        where: { id: userId }
      })
      if (updated) {
        return await UserProfile.findByPk(userId)
      }
      throw new Error('UserProfile not found')
    } catch (error) {
      throw new Error(`Failed to update profile: ${error}`)
    }
  }
}

export default UserProfileUpdateService 