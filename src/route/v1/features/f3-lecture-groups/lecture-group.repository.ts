import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  LectureGroup,
  LectureGroupDocument,
} from './schemas/lecture-group.schema';

@Injectable()
export default class LectureGroupRepository extends BaseRepository<LectureGroupDocument> {
  constructor(
    @InjectModel(LectureGroup.name) model: PaginateModel<LectureGroupDocument>,
  ) {
    super(model);
  }
}
