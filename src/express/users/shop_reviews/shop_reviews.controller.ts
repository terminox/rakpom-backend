export default class ShopReviewsController {

  private service: ShopReviewsFetchingService

  constructor(service: ShopReviewsFetchingService) {
    this.service = service
  }

  async getShopReviews(shopID: string): Promise<ShopReview[]> {
    return await this.service.getShopReviews(shopID)
  }
}

export interface ShopReviewsFetchingService {
  getShopReviews(shopID: string): Promise<ShopReview[]>
}

export type ShopReview = {
  reviewerName: string
  score: number
  text: string
  dateString: string
  reviewerImageURL: string
}
