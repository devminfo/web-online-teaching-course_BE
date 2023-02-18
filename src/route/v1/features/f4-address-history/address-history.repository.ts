import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  AddressHistory,
  AddressHistoryDocument,
} from './schemas/address-history.schema';

@Injectable()
export default class AddressHistoryRepository extends BaseRepository<AddressHistoryDocument> {
  constructor(
    @InjectModel(AddressHistory.name)
      model: PaginateModel<AddressHistoryDocument>,
  ) {
    super(model);
  }
}
