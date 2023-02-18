import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import { LearningPathDocument } from './schemas/learning-path.schema';
import LearningPathRepository from './learning-path.repository';

@Injectable()
export default class LearningPathService extends BaseService<LearningPathDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly learningPathRepository: LearningPathRepository,
  ) {
    super(logger, learningPathRepository);
  }
}
