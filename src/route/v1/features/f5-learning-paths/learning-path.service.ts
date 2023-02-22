import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import LearningPathRepository from './learning-path.repository';
import { LearningPathDocument } from './schemas/learning-path.schema';

@Injectable()
export default class LearningPathService extends BaseService<LearningPathDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly learningPathRepository: LearningPathRepository,
  ) {
    super(logger, learningPathRepository);
  }
}
