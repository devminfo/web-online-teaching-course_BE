import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { FreeApi, FreeApiDocument } from './schemas/free-api.schema';

@Injectable()
export default class FreeApiRepository extends BaseRepository<FreeApiDocument> {
  constructor(
    @InjectModel(FreeApi.name)
      FreeAPIModel: PaginateModel<FreeApiDocument>,
  ) {
    super(FreeAPIModel);
  }
}
