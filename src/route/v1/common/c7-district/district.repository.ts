import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { District, DistrictDocument } from '@common/c7-district/schemas/district.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export default class DistrictRepository extends BaseRepository<DistrictDocument> {
  constructor(
    @InjectModel(District.name) model: PaginateModel<DistrictDocument>,
  ) {
    super(model);
  }
}
