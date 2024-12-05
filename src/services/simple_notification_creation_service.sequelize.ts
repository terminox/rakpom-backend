import { ulid } from 'ulid'
import { Sequelize } from 'sequelize'

import SimpleNotificationItem from '../sequelize/models/simple_notification_item'

export default class SequelizeSimpleNotificationCreationService {
  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async createNotification(payload: CreateNotificationPayload): Promise<void> {
    const { userID, title, description } = payload

    await SimpleNotificationItem.create({
      id: ulid(),
      userID,
      title,
      description
    })
  }
}

export type CreateNotificationPayload = {
  userID: string
  title: string
  description: string
}
