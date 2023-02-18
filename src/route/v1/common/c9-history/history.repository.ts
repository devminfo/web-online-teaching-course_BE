import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { History, HistoryDocument } from './schemas/history.schema';

@Injectable()
export default class HistoryRepository extends BaseRepository<HistoryDocument> {
  constructor(
    @InjectModel(History.name) model: PaginateModel<HistoryDocument>,
  ) {
    super(model);
  }
}
