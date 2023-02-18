import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongodb';

export default class CreateQuizDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly createdBy: string;

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
  content: {
    questions: { text: string; image: string; file: string; audio: string };
    answer: string;
    position: string;
    createdAt: string;
  }[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  timeLimit: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  tags: string[];
}
