import { PartialType } from '@nestjs/mapped-types';

import CreateLectureDto from './create-lecture.dto';

export default class UpdateLectureDto extends PartialType(CreateLectureDto) {}
