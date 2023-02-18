import { PartialType } from '@nestjs/mapped-types';

import CreateLectureGroupDto from './create-lecture-group.dto';

export default class UpdateLectureGroupDto extends PartialType(
  CreateLectureGroupDto,
) {}
