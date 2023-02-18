import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import { UserTestDocument } from './schemas/user-test.schema';
import UserTestRepository from './user-test.repository';

@Injectable()
export default class UserTestService extends BaseService<UserTestDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly userTestRepository: UserTestRepository,
  ) {
    super(logger, userTestRepository);
  }
}
