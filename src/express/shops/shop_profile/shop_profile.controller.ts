export default class ShopProfileController {

  private service: ShopProfileFetchingService

  constructor(service: ShopProfileFetchingService) {
    this.service = service
  }

  async getShopProfile(shopID: string): Promise<ShopProfile> {
    return await this.service.getShopProfile(shopID)
  }
}

export interface ShopProfileFetchingService {
  getShopProfile(shopID: string): Promise<ShopProfile>
}

export type ShopProfile = {
  id: string
  fullName: string
  shopCode: string
  avatarURL: string
}
