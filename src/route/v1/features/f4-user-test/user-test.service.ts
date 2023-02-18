import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import { UserTDocument } from './schemas/user-test.schema';
import UserTRepository from './user-test.repository';

@Injectable()
export default class UserTService extends BaseService<UserTDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly userTRepository: UserTRepository,
  ) {
    super(logger, userTRepository);
  }
}
