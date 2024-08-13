import jwt from 'jsonwebtoken'

import { LoginCredentialEncoder, LoginResult, LoginCredentials } from '../../express/users/login/login.controller'
import { SignupCredentialEncoder, SignupResult, SignupCredentials } from '../../express/users/signup/signup.controller'

export default class JWTCoder implements LoginCredentialEncoder, SignupCredentialEncoder {
  async encodeLoginResult(result: LoginResult): Promise<LoginCredentials> {
    const accessToken = jwt.sign({ data: result }, 'secret')
    const credentials = { accessToken }
    return credentials
  } 

  async encodeSignupResult(result: SignupResult): Promise<SignupCredentials> {
    const accessToken = jwt.sign({ data: result }, 'secret')
    const credentials = { accessToken }
    return credentials
  }
}
