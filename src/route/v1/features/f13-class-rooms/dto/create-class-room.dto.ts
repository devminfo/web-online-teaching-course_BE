import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongodb';

export default class CreateClassRoomDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly idQuiz: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly idUser: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly score: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly rightAnswers: number[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly startTime: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly endTime: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly timeLimit: string;
}
