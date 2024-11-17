import { Sequelize } from 'sequelize'
import { ulid } from 'ulid'

import ReviewItem from '../../../sequelize/models/review_item'
import Shop from '../../../sequelize/models/shop'

class SequelizeReviewCreationService {

  constructor(private sequelize: Sequelize) {}

  async createReview({ userID, shopCode, score, content }: { userID: string, shopCode: string, score: number, content: string }) {
    try {
      const shop = await Shop.findOne({
        where: { shopCode }
      })

      if (!shop) {
        throw new Error('Shop not found')
      }

      const review = await ReviewItem.create({
        id: ulid(),
        userID,
        shopID: shop.id,
        score,
        content,
      })

      return review
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create review: ${error.message}`)
      }
      throw new Error('Failed to create review')
    }
  }
}

export default SequelizeReviewCreationService
