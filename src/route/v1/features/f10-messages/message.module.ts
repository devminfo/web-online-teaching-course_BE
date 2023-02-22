import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import MessageController from './message.controller';
import MessageRepository from './message.repository';
import MessageService from './message.service';
import { Message, MessageSchema } from './schemas/message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Message.name,
        schema: MessageSchema,
      },
    ]),
  ],
  controllers: [MessageController],
  providers: [MessageService, MessageRepository],
  exports: [MessageService, MessageRepository],
})
export default class MessageModule {}
