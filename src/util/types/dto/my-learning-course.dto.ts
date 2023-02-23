import {
  IsBoolean, IsMongoId, IsNumber, IsOptional
} from 'class-validator';

export class MyLearningCourseDto {
  @IsOptional()
  @IsMongoId()
  idCourse: string;

  @IsOptional()
  @IsNumber()
  currentLesson: number;
}
