import { Sequelize } from 'sequelize'
import { ShopReviewsFetchingService, ShopReview } from './shop_reviews.controller'
import ReviewItem from '../../../sequelize/models/review_item'
import UserProfile from '../../../sequelize/models/user_profile'

export default class SequelizeShopReviewsFetchingService implements ShopReviewsFetchingService {
  
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async getShopReviews(shopID: string): Promise<ShopReview[]> {
    try {
      const reviews = await ReviewItem.findAll({
        where: { shopID },
        include: [{
          model: UserProfile,
          attributes: ['fullName', 'avatarURL']
        }],
        order: [['createdAt', 'DESC']]
      })

      return reviews.map(review => ({
        id: review.id,
        reviewerName: (review as any).UserProfile?.fullName,
        score: review.score,
        text: review.content,
        dateString: review.createdAt.toLocaleString('th-TH', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        }),
        reviewerImageURL: (review as any).UserProfile?.avatarURL
      }))
    } catch (error) {
      console.error('Error fetching shop reviews:', error)
      throw new Error('Failed to fetch shop reviews')
    }
  }
}
