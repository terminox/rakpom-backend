export default class NotificationListController {

  private service: NotificationListFetchingService

  constructor(service: NotificationListFetchingService) {
    this.service = service
  }

  async getNotificationList(offset: number, limit: number): Promise<NotificationItem[]> {
    const items = await this.service.getNotificationList(offset, limit)
    return items 
  }
}

export interface NotificationListFetchingService {
  getNotificationList(offset: number, limit: number): Promise<NotificationItem[]>
}

export type NotificationItem = {
  id: string
  title: string
  description: string
  dateString: string
  imageURL: string
}
