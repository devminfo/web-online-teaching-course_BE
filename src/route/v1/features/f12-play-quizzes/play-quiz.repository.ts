import { PaginateModel } from 'mongoose';

import BaseRepository from '@base-inherit/base.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { PlayQuiz, PlayQuizDocument } from './schemas/play-quiz.schema';

@Injectable()
export default class PlayQuizRepository extends BaseRepository<PlayQuizDocument> {
  constructor(
    @InjectModel(PlayQuiz.name) model: PaginateModel<PlayQuizDocument>,
  ) {
    super(model);
  }
}
