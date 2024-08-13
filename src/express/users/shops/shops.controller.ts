export default class UserShopsController {

  private service: ShopListFetchingService

  constructor(service: ShopListFetchingService) {
    this.service = service
  }

  async getShops(offset: number, limit: number): Promise<Shop[]> {
    const shops = await this.service.getShops(offset, limit)
    return shops
  }
}

export interface ShopListFetchingService {
  getShops(offset: number, limit: number): Promise<Shop[]>
}

export type Shop = {
  name: string
  imageURL: string
  address: string
}
