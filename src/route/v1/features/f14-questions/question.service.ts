import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import { QuestionDocument } from './schemas/question.schema';
import QuestionRepository from './question.repository';

@Injectable()
export default class QuestionService extends BaseService<QuestionDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly questionRepository: QuestionRepository,
  ) {
    super(logger, questionRepository);
  }
}
