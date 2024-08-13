import { Sequelize } from 'sequelize'

import { LoginService, LoginUser, LoginResult } from './login.controller'

import Shop from '../../../sequelize/models/shop'

export default class SequelizeLoginService implements LoginService {
  
    private sequelize: Sequelize
  
    constructor(sequelize: Sequelize) {
      this.sequelize = sequelize
    }
  
    async login(user: LoginUser): Promise<LoginResult> {
      const shop = await Shop.findOne({
        where: { id: user.authorizableID }
      })

      if (shop == null) {
        throw new Error('Shop not found') // TODO
      }

      return {
        id: shop.id,
      }
    }
  }
