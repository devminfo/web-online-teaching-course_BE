import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongodb';

export default class CreateLectureGroupDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly idCourse: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly position: string;
}
