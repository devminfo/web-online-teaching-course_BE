import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import QuestionRepository from './question.repository';
import { QuestionDocument } from './schemas/question.schema';

@Injectable()
export default class QuestionService extends BaseService<QuestionDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly questionRepository: QuestionRepository,
  ) {
    super(logger, questionRepository);
  }
}
