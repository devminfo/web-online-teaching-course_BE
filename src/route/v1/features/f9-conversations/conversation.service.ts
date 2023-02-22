import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import ConversationRepository from './conversation.repository';
import { ConversationDocument } from './schemas/conversation.schema';

@Injectable()
export default class ConversationService extends BaseService<ConversationDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly conversationRepository: ConversationRepository,
  ) {
    super(logger, conversationRepository);
  }
}
