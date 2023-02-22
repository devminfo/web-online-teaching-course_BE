import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { LearningPath, LearningPathDocument } from './schemas/learning-path.schema';

@Injectable()
export default class LearningPathRepository extends BaseRepository<LearningPathDocument> {
  constructor(
    @InjectModel(LearningPath.name) model: PaginateModel<LearningPathDocument>,
  ) {
    super(model);
  }
}
