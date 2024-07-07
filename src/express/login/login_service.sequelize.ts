import { Sequelize } from 'sequelize'

import { LoginService, LoginUser, LoginCredentials } from './login.controller'

export default class SequelizeLoginService implements LoginService {
  
    private sequelize: Sequelize
  
    constructor(sequelize: Sequelize) {
      this.sequelize = sequelize
    }
  
    async login(user: LoginUser): Promise<LoginCredentials> {
      // TODO
      return { token: '' } as LoginCredentials
    }
  }
