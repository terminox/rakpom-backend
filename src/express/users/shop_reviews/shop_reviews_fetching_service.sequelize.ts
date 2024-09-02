import { Sequelize } from 'sequelize'

import { ShopReviewsFetchingService, ShopReview } from './shop_reviews.controller'

export default class SequelizeShopReviewsFetchingService implements ShopReviewsFetchingService {
  
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async getShopReviews(shopID: string): Promise<ShopReview[]> {
    // TODO
    return [
      {
        id: '1',
        reviewerName: 'Alice',
        score: 5,
        text: 'Good',
        dateString: '2021-01-01',
        reviewerImageURL: 'https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=3486&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        id: '2',
        reviewerName: 'Bob',
        score: 4,
        text: 'Not bad',
        dateString: '2021-01-02',
        reviewerImageURL: 'https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=3486&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        id: '3',
        reviewerName: 'Charlie',
        score: 3,
        text: 'So so',
        dateString: '2021-01-03',
        reviewerImageURL: 'https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=3486&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        id: '4',
        reviewerName: 'David',
        score: 2,
        text: 'Bad',
        dateString: '2021-01-04',
        reviewerImageURL: 'https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=3486&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      },
      {
        id: '5',
        reviewerName: 'Eve',
        score: 1,
        text: 'Very bad',
        dateString: '2021-01-05',
        reviewerImageURL: 'https://plus.unsplash.com/premium_photo-1671656349218-5218444643d8?q=80&w=3486&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
      }
    ]
  }
}
