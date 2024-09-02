import { Sequelize } from 'sequelize'

import { ShopListFetchingService, Shop } from './shops.controller'

export default class SequelizeShopListFetchingService implements ShopListFetchingService {

  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async getShops(offset: number, limit: number): Promise<Shop[]> {
    // TODO
    return [
      {
        id: "01J4ME0AEAYC6CC5Y2ZDMFX0AV",
        name: "ร้านลุงหนุ่ม",
        imageURL: "https://images.unsplash.com/photo-1532710093739-9470acff878f?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        address: "35/8 ถนน งามวงศ์วาน แขวงลาดยาว เขตจตุจักร กรุงเทพมหานคร  10900"
      }
    ]
  }
}
