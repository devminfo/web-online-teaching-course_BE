import { PartialType } from '@nestjs/mapped-types';

import CreateTestQuestionDto from './create-test-question.dto';

export default class UpdateTestQuestionDto extends PartialType(
  CreateTestQuestionDto,
) {}
