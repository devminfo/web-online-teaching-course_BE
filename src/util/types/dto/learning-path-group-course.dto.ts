import { IsBoolean, IsMongoId, IsOptional } from 'class-validator';

export class LearningPathGroupCourseDto {
  @IsOptional()
  @IsMongoId()
  idCourse: string;

  @IsOptional()
  @IsBoolean()
  isRelated: string;
}
