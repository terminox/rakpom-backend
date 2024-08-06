import { Sequelize } from 'sequelize'

import { LoginUserStore, LoginUser } from './login.controller'

import BasicAuthItem from '../../sequelize/models/basic_auth_item'

export default class SequelizeUserStore implements LoginUserStore {

  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async findUserByEmail(email: string): Promise<LoginUser> {
    const authItem = await BasicAuthItem.findOne({
      where: { email }
    })

    if (authItem == null) {
      throw new Error('') // TODO
    }

    return {
      email: authItem.email,
      hash: authItem.hash,
      salt: authItem.salt,
    }
  }
}
