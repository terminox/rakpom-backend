import jwt from 'jsonwebtoken'

import { LoginCredentialEncoder, LoginResult, LoginCredentials } from '../../express/login/login.controller'
import { SignupCredentialEncoder, SignupResult, SignupCredentials } from '../../express/signup/signup.controller'

export default class JWTCoder implements LoginCredentialEncoder, SignupCredentialEncoder {
  async encodeLoginResult(result: LoginResult): Promise<LoginCredentials> {
    const accessToken = await jwt.sign({ data: result }, 'secret')
    const credentials = { accessToken }
    return credentials
  } 

  async encodeSignupResult(result: SignupResult): Promise<SignupCredentials> {
    const accessToken = await jwt.sign({ data: result }, 'secret')
    const credentials = { accessToken }
    return credentials
  }  
}
