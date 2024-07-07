export default class UserLoginController {

  private store: LoginUserStore
  private validator: LoginValidator
  private loginService: LoginService

  constructor(store: LoginUserStore, validator: LoginValidator, loginService: LoginService) {
    this.store = store
    this.validator = validator
    this.loginService = loginService
  }

  async login(email: string, password: string): Promise<LoginCredentials> {
    const user = await this.store.findUserByEmail(email)
    await this.validator.compareUser(user, password)
    const credentials = await this.loginService.login(user)
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
  login(user: LoginUser): Promise<LoginCredentials>
}

export type LoginUser = {
  id: string
  email: string
  hash: string
  salt: string
}

export type LoginCredentials = {
  token: string
}
