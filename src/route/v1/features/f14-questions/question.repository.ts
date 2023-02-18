import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Question, QuestionDocument } from './schemas/question.schema';

@Injectable()
export default class QuestionRepository extends BaseRepository<QuestionDocument> {
  constructor(
    @InjectModel(Question.name) model: PaginateModel<QuestionDocument>,
  ) {
    super(model);
  }
}
