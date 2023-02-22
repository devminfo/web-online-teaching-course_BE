import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import LectureGroupRepository from './lecture-group.repository';
import { LectureGroupDocument } from './schemas/lecture-group.schema';

@Injectable()
export default class LectureGroupService extends BaseService<LectureGroupDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly lectureGroupRepository: LectureGroupRepository,
  ) {
    super(logger, lectureGroupRepository);
  }
}
