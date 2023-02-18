import { PartialType } from '@nestjs/mapped-types';

import CreateReviewDto from './create-review.dto';

export default class UpdateReviewDto extends PartialType(CreateReviewDto) {}
