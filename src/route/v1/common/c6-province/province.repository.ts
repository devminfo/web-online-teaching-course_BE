import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Province, ProvinceDocument } from '@common/c6-province/schemas/province.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export default class ProvinceRepository extends BaseRepository<ProvinceDocument> {
  constructor(
    @InjectModel(Province.name) model: PaginateModel<ProvinceDocument>,
  ) {
    super(model);
  }
}
