import { Sequelize } from 'sequelize'
import User from '../sequelize/models/user_profile' // Adjust the path as necessary

class SequelizeUserFetchingService {
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async fetchAllUsers() {
    try {
      const users = await User.findAll()
      return users
    } catch (error) {
      throw new Error('Error fetching users: ' + (error as Error).message)
    }
  }
}

export default SequelizeUserFetchingService 