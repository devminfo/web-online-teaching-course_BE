import { PartialType } from '@nestjs/mapped-types';

import CreateLearningPathDto from './create-learning-path.dto';

export default class UpdateLearningPathDto extends PartialType(
  CreateLearningPathDto,
) {}
