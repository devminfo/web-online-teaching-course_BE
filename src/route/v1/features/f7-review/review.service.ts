import BaseService from '@base-inherit/base.service';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

import { ReviewDocument } from './schemas/review.schema';
import ReviewRepository from './review.repository';

@Injectable()
export default class ReviewService extends BaseService<ReviewDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly reviewRepository: ReviewRepository,
  ) {
    super(logger, reviewRepository);
  }
}
