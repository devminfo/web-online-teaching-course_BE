import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import NotificationRepository from './notification.repository';
import { NotificationDocument } from './schemas/notification.schema';

@Injectable()
export default class NotificationService extends BaseService<NotificationDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly notificationRepository: NotificationRepository,
  ) {
    super(logger, notificationRepository);
  }
}
