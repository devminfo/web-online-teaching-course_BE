import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import { CourseDocument } from './schemas/course.schema';
import CourseRepository from './course.repository';

@Injectable()
export default class CourseService extends BaseService<CourseDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly courseRepository: CourseRepository,
  ) {
    super(logger, courseRepository);
  }
}
