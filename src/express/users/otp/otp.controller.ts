export type OTPResponse = {
  refCode: string
}

export default class OTPController {

  // private hasher: Hasher
  // private store: UserStore
  // private encoder: SignupCredentialEncoder

  // constructor(hasher: Hasher, store: UserStore, encoder: SignupCredentialEncoder) {
  //   this.hasher = hasher
  //   this.store = store
  //   this.encoder = encoder
  // }

  async requestPhoneSignupOTP(phone: string): Promise<OTPResponse> {
    return { refCode: '123456' }
  }
}