import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import { LectureDocument } from './schemas/lecture.schema';
import LectureRepository from './lecture.repository';

@Injectable()
export default class LectureService extends BaseService<LectureDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly lectureRepository: LectureRepository,
  ) {
    super(logger, lectureRepository);
  }
}
