import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Village, VillageDocument } from './schemas/village.schema';

@Injectable()
export default class VillageRepository extends BaseRepository<VillageDocument> {
  constructor(
    @InjectModel(Village.name) model: PaginateModel<VillageDocument>,
  ) {
    super(model);
  }
}
