import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import { ReconciliationHistoryDocument } from './schemas/reconciliation-history.schema';
import ReconciliationHistoryRepository from './reconciliation-history.repository';

@Injectable()
export default class ReconciliationHistoryService extends BaseService<ReconciliationHistoryDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly reconciliationHistoryRepository: ReconciliationHistoryRepository,
  ) {
    super(logger, reconciliationHistoryRepository);
  }
}
