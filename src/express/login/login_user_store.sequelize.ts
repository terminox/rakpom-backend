import { Sequelize } from 'sequelize'

import { LoginUserStore, LoginUser } from './login.controller'

export default class SequelizeUserStore implements LoginUserStore {

  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async findUserByEmail(email: string): Promise<LoginUser> {
    // TODO
    return { id: '', email: '', hash: '', salt: '' } as LoginUser
  }
}
