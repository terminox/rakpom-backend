export default class ShopDetailController {

  private service: ShopDetailFetchingService

  constructor(service: ShopDetailFetchingService) {
    this.service = service
  }

  async getShopDetail(shopID: string): Promise<ShopDetail> {
    return await this.service.getShopDetail(shopID)
  }
}

export interface ShopDetailFetchingService {
  getShopDetail(shopID: string): Promise<ShopDetail>
}

export type ShopDetail = {
  reviewerName: string
  score: number
  text: string
  dateString: string
  reviewerImageURL: string
}
