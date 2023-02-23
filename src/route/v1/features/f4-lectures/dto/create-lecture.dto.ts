import {
  IsArray, IsBoolean, IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString,
} from 'class-validator';
import { ObjectId } from 'mongodb';

import { LectureTypeEnum } from '@enum/8.lecture-type.enum';

export default class CreateLectureDto {
  @IsNotEmpty()
  @IsEnum(LectureTypeEnum)
  type: LectureTypeEnum;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsNumber()
  position: number;

  @IsNotEmpty()
  @IsNumber()
  lesson: number;

  @IsNotEmpty()
  @IsNumber()
  totalTimes: number;
}
