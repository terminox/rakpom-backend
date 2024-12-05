import _ from 'lodash'
import { Sequelize, Op } from 'sequelize'

import { NotificationListFetchingService, NotificationItem } from './controller'

import SequelizeSimpleNotificationItem from '../../../sequelize/models/simple_notification_item'

export default class SequelizeNotificationListFetchingService implements NotificationListFetchingService {

  private sequelize: Sequelize

  constructor(sequelize: Sequelize) {
    this.sequelize = sequelize
  }

  async getNotificationList(userID: string, offset: number, limit: number): Promise<NotificationItem[]> {
    const seqNotifications = await SequelizeSimpleNotificationItem.findAll({
      where: { userID },
      order: [['createdAt', 'DESC']],
      // offset,
      // limit
    })

    const notifications: NotificationItem[] = seqNotifications.map((notification): NotificationItem => {
      return {
        id: notification.id,
        title: notification.title,
        description: notification.description,
        dateString: notification.createdAt.toLocaleDateString('th-TH', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          calendar: 'buddhist'
        }),
        imageURL: '' // Assuming SimpleNotificationItem doesn't have an imageURL field
      }
    })

    return notifications
  }
}
