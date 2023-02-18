import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  ReconciliationHistory,
  ReconciliationHistoryDocument,
} from './schemas/reconciliation-history.schema';

@Injectable()
export default class ReconciliationHistoryRepository extends BaseRepository<ReconciliationHistoryDocument> {
  constructor(
    @InjectModel(ReconciliationHistory.name)
      model: PaginateModel<ReconciliationHistoryDocument>,
  ) {
    super(model);
  }
}
