export type SignupPayload = {
  email: string
  hash: string
  salt: string
}

export type SignupResult = {
  id: string
  email: string
  memberID: string
  fullName: string | null
  gender: string | null
  phoneNumber: string | null
}

export type SignupCredentials = {
  accessToken: string
}

export type HashResult = {
  hash: string
  salt: string
}

export interface Hasher {
  hash(s: string): Promise<HashResult>
}

export interface UserStore {
  storeUser(payload: SignupPayload): Promise<SignupResult>
}

export interface SignupCredentialEncoder {
  encodeSignupResult(result: SignupResult): Promise<SignupCredentials>
}

export default class UserSignupController {

  private hasher: Hasher
  private store: UserStore
  private encoder: SignupCredentialEncoder

  constructor(hasher: Hasher, store: UserStore, encoder: SignupCredentialEncoder) {
    this.hasher = hasher
    this.store = store
    this.encoder = encoder
  }

  async signup(email: string, password: string): Promise<SignupCredentials> {
    const { hash, salt } = await this.hasher.hash(password)
    const payload: SignupPayload = { email, hash, salt }
    const result = await this.store.storeUser(payload)
    const credentials = await this.encoder.encodeSignupResult(result)
    return credentials
  }
}