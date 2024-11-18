export default class ShopProfileController {

  private service: ShopProfileUpdatingService

  constructor(service: ShopProfileUpdatingService) {
    this.service = service
  }

  async updateShopProfile(shopID: string, payload: ShopProfileUpdatePayload) {
    return this.service.updateShopProfile(shopID, payload)
  }
}

export interface ShopProfileUpdatingService {
  updateShopProfile(shopID: string, payload: ShopProfileUpdatePayload): Promise<void>
}

export type ShopProfile = {
  id: string
  shopName: string | null
  shopOwnerName: string | null
  phone: string | null
  bankName: string | null
  bankAccountNumber: string | null
  juniorPriceTHB: number | null
  seniorPriceTHB: number | null
}

export type ShopProfileUpdatePayload = {
  shopName?: string
  shopOwnerName?: string
  phone?: string
  bankName?: string
  bankAccountNumber?: string
  juniorPriceTHB?: number
  seniorPriceTHB?: number
  coverImageURL?: string
  thumbnailImageURL?: string
  address?: string
}
