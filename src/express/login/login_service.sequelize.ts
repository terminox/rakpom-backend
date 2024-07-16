import { Sequelize } from 'sequelize'

import { LoginService, LoginUser, LoginResult } from './login.controller'

import UserProfile from '../../sequelize/models/user_profile'

export default class SequelizeLoginService implements LoginService {
  
    private sequelize: Sequelize
  
    constructor(sequelize: Sequelize) {
      this.sequelize = sequelize
    }
  
    async login(user: LoginUser): Promise<LoginResult> {
      const profile = await UserProfile.findOne({
        where: { email: user.email }
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
      }
    }
  }
