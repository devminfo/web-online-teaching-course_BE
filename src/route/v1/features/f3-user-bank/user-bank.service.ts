import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import { UserBankDocument } from './schemas/user-bank.schema';
import UserBankRepository from './user-bank.repository';

@Injectable()
export default class UserBankService extends BaseService<UserBankDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly userBankRepository: UserBankRepository,
  ) {
    super(logger, userBankRepository);
  }
}
