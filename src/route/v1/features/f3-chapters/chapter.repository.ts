import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Chapter, ChapterDocument } from './schemas/chapter.schema';

@Injectable()
export default class ChapterRepository extends BaseRepository<ChapterDocument> {
  constructor(
    @InjectModel(Chapter.name) model: PaginateModel<ChapterDocument>,
  ) {
    super(model);
  }
}
