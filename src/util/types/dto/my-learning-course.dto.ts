import { IsMongoId, IsNumber, IsOptional } from 'class-validator';

export class MyLearningCourseDto {
  @IsOptional()
  @IsMongoId()
  _id?: string;

  @IsOptional()
  @IsMongoId()
  idCourse: string;

  @IsOptional()
  @IsNumber()
  currentLesson: number;
}
