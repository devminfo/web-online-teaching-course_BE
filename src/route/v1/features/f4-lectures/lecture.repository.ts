import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Lecture, LectureDocument } from './schemas/lecture.schema';

@Injectable()
export default class LectureRepository extends BaseRepository<LectureDocument> {
  constructor(
    @InjectModel(Lecture.name) model: PaginateModel<LectureDocument>,
  ) {
    super(model);
  }
}
