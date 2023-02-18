import { PartialType } from '@nestjs/mapped-types';

import CreateCourseDto from './create-course.dto';

export default class UpdateCourseDto extends PartialType(CreateCourseDto) {}
