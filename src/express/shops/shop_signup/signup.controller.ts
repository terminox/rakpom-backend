export type SignupPayload = {
  email: string
  hash: string
  salt: string
}

export type SignupResult = {
  id: string
  // TODO
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

export interface ShopStore {
  storeShop(payload: SignupPayload): Promise<SignupResult>
}

export interface SignupCredentialEncoder {
  encodeSignupResult(result: SignupResult): Promise<SignupCredentials>
}

export default class ShopSignupController {

  private hasher: Hasher
  private store: ShopStore
  private encoder: SignupCredentialEncoder

  constructor(hasher: Hasher, store: ShopStore, encoder: SignupCredentialEncoder) {
    this.hasher = hasher
    this.store = store
    this.encoder = encoder
  }

  async signup(email: string, password: string): Promise<SignupCredentials> {
    const { hash, salt } = await this.hasher.hash(password)
    const payload: SignupPayload = { email, hash, salt }
    const result = await this.store.storeShop(payload)
    const credentials = await this.encoder.encodeSignupResult(result)
    return credentials
  }
}