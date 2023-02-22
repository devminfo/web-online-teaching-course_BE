import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { LearningPathGroupCourseDto } from './learning-path-group-course.dto';

export class LearningPathGroupDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  desc: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LearningPathGroupCourseDto)
  courses: LearningPathGroupCourseDto[];
}
