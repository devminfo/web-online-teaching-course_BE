import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import NotificationController from './notification.controller';
import NotificationRepository from './notification.repository';
import NotificationService from './notification.service';
import { Notification, NotificationSchema } from './schemas/notification.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Notification.name,
        schema: NotificationSchema,
      },
    ]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationRepository],
  exports: [NotificationService, NotificationRepository],
})
export default class NotificationModule {}
