import { Sequelize } from 'sequelize'
import { ulid } from 'ulid'
import parsePhoneNumber from 'libphonenumber-js'

import FirebasePhoneAuthItem from '../../../sequelize/models/firebase_phone_auth_item'
import Shop from '../../../sequelize/models/shop'

export default class SequelizeFirebasePhoneSignupService {
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async signUp(payload: FirebasePhoneSignupPayload): Promise<FirebasePhoneSignupResult> {
    const formattedPhone = parsePhoneNumber(payload.phone, 'TH')?.formatNational()
    if (formattedPhone == null) {
      throw new Error('Invalid phone number')
    }

    const authItem = await FirebasePhoneAuthItem.findOne({ where: { phone: formattedPhone } })

    if (authItem == null) {
      // Signup
      const transaction = await this.sequelize.transaction()

      try {
        const profile = await Shop.create({
          id: ulid(),
          phone: formattedPhone,
        }, {
          transaction
        })
    
        await FirebasePhoneAuthItem.create({
          id: ulid(),
          phone: formattedPhone,
          authorizableID: profile.id,
        }, {
          transaction
        })
    
        await transaction.commit()
  
        return { status: 'profile' }
      } catch (err) {
        await transaction.rollback()
        throw err
      }
    } else {
      // Login
      const profile = await Shop.findOne({ where: { id: authItem.authorizableID } })

      if (profile == null) {
        throw new Error('Profile not found')
      }

      return { status: 'completed' }
    }
  }
}

type FirebasePhoneSignupPayload = {
  phone: string
}

type FirebasePhoneSignupResult = {
  status: string
}