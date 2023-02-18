import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import { TestQuestionDocument } from './schemas/test-question.schema';
import TestQuestionRepository from './test-question.repository';

@Injectable()
export default class TestQuestionService extends BaseService<TestQuestionDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly testQuestionRepository: TestQuestionRepository,
  ) {
    super(logger, testQuestionRepository);
  }
}
