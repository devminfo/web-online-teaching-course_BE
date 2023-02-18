import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RequestChat, RequestChatSchema } from './schemas/request-chat.schema';
import RequestChatController from './request-chat.controller';
import RequestChatRepository from './request-chat.repository';
import RequestChatService from './request-chat.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RequestChat.name,
        schema: RequestChatSchema,
      },
    ]),
  ],
  controllers: [RequestChatController],
  providers: [RequestChatService, RequestChatRepository],
  exports: [RequestChatService, RequestChatRepository],
})
export default class RequestChatModule {}
