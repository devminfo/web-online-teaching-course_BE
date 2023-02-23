import {
  IsMongoId, IsNotEmpty, IsNumber, IsString
} from 'class-validator';

export default class CreateLectureGroupDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly idCourse: string;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsNumber()
  readonly position: number;
}
