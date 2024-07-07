import { Sequelize } from 'sequelize'

import { UserStore, SignupPayload, SignupCredentials } from './signup.controller'

export default class SequelizeUserStore implements UserStore {

  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async storeUser(payload: SignupPayload): Promise<SignupCredentials> {
    // TODO
    return { token: '' } as SignupCredentials
  }
}