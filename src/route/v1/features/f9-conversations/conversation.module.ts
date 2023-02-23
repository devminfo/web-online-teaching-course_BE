import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import ConversationController from './conversation.controller';
import ConversationRepository from './conversation.repository';
import ConversationService from './conversation.service';
import { Conversation, ConversationSchema } from './schemas/conversation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Conversation',
        schema: ConversationSchema,
      },
    ]),
  ],
  controllers: [ConversationController],
  providers: [ConversationService, ConversationRepository],
  exports: [ConversationService, ConversationRepository],
})
export default class ConversationModule {}
