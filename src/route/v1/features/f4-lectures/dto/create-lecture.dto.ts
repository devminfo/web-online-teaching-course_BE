import {
  IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString,
} from 'class-validator';
import { ObjectId } from 'mongodb';

export default class CreateLectureDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  type: 'VIDEO' | 'QUIZ' | 'FILE';

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  url: 'URL_VIDEO' | 'ID_QUIZ' | 'URL' | 'FILE';

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  position: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  totalTimes: string;
}
