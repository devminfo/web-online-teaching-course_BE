import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import {
  TestQuestion,
  TestQuestionDocument,
} from './schemas/test-question.schema';

@Injectable()
export default class TestQuestionRepository extends BaseRepository<TestQuestionDocument> {
  constructor(
    @InjectModel(TestQuestion.name) model: PaginateModel<TestQuestionDocument>,
  ) {
    super(model);
  }
}
