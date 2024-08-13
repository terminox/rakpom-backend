export default class UserLoginController {

  private store: LoginUserStore
  private validator: LoginValidator
  private loginService: LoginService
  private encoder: LoginCredentialEncoder

  constructor(store: LoginUserStore, validator: LoginValidator, loginService: LoginService, encoder: LoginCredentialEncoder) {
    this.store = store
    this.validator = validator
    this.loginService = loginService
    this.encoder = encoder
  }

  async login(email: string, password: string): Promise<LoginCredentials> {
    const user = await this.store.findUserByEmail(email)
    await this.validator.compareUser(user, password)
    const result = await this.loginService.login(user)
    const credentials = await this.encoder.encodeLoginResult(result)
    return credentials
  }
}

export interface LoginUserStore {
  findUserByEmail(email: string): Promise<LoginUser>
}

export interface LoginValidator {
  compareUser(user: LoginUser, password: string): Promise<void>
}

export interface LoginService {
  login(user: LoginUser): Promise<LoginResult>
}

export interface LoginCredentialEncoder {
  encodeLoginResult(result: LoginResult): Promise<LoginCredentials>
}

export type LoginUser = {
  email: string
  hash: string
  salt: string
}

export type LoginResult = {
  id: string
  email: string
  memberID: string
  fullName: string | null
  gender: string | null
  phoneNumber: string | null
}

export type LoginCredentials = {
  accessToken: string
}
