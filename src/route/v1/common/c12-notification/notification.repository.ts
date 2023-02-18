import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Notification, NotificationDocument } from './schemas/notification.schema';

@Injectable()
export default class NotificationRepository extends BaseRepository<NotificationDocument> {
  constructor(
    @InjectModel(Notification.name) model: PaginateModel<NotificationDocument>,
  ) {
    super(model);
  }
}
