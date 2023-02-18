import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import { TransactionDocument } from './schemas/transaction.schema';
import TransactionRepository from './transaction.repository';

@Injectable()
export default class TransactionService extends BaseService<TransactionDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly transactionRepository: TransactionRepository,
  ) {
    super(logger, transactionRepository);
  }
}
