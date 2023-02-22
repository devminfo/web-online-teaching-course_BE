import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import QuizRepository from './quiz.repository';
import { QuizDocument } from './schemas/quiz.schema';

@Injectable()
export default class QuizService extends BaseService<QuizDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly quizRepository: QuizRepository,
  ) {
    super(logger, quizRepository);
  }
}
