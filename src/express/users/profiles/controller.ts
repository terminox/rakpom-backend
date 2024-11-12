export default class UserProfileController {

  private service: UserProfileFetchingService

  constructor(service: UserProfileFetchingService) {
    this.service = service
  }

  async getUserProfile(id: string): Promise<UserProfile> {
    return this.service.getUserProfile(id)
  }
}

export interface UserProfileFetchingService {
  getUserProfile(id: string): Promise<UserProfile>
}

export type UserProfile = {
  id: string
  email: string
  memberID: string
  fullName: string | null
  gender: string | null
  phoneNumber: string | null
  avatarURL: string | null
  totalPoints: number
}
