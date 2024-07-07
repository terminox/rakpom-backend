export type SignupPayload = {
  email: string
  hash: string
  salt: string
}

export type SignupCredentials = {
  token: string
}

export type HashResult = {
  hash: string
  salt: string
}

export interface Hasher {
  hash(s: string): Promise<HashResult>
}

export interface UserStore {
  storeUser(payload: SignupPayload): Promise<SignupCredentials>
}

export default class UserSignupController {

  private hasher: Hasher
  private store: UserStore

  constructor(hasher: Hasher, store: UserStore) {
    this.hasher = hasher
    this.store = store
  }

  async signup(email: string, password: string): Promise<SignupCredentials> {
    const { hash, salt } = await this.hasher.hash(password)
    const payload: SignupPayload = { email, hash, salt }
    const credentials = await this.store.storeUser(payload)
    return credentials
  }
}