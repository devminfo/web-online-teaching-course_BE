import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Quiz, QuizDocument } from './schemas/quiz.schema';

@Injectable()
export default class QuizRepository extends BaseRepository<QuizDocument> {
  constructor(@InjectModel(Quiz.name) model: PaginateModel<QuizDocument>) {
    super(model);
  }
}
