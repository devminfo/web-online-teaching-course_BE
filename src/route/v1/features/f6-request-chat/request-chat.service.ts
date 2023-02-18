import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import { RequestChatDocument } from './schemas/request-chat.schema';
import RequestChatRepository from './request-chat.repository';

@Injectable()
export default class RequestChatService extends BaseService<RequestChatDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly requestChatRepository: RequestChatRepository,
  ) {
    super(logger, requestChatRepository);
  }
}
