import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class CreateLearningPathDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly desc: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly thumbnail: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly learningPathGroups: {
    title: string;
    desc: string;
    courses: { idCourse: string; isRelated: string }[];
  }[];
}
