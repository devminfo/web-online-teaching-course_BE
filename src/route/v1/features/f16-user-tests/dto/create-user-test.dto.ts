import {
  IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString,
} from 'class-validator';
import { ObjectId } from 'mongodb';

export default class CreateUserTestDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  idTestQuestion: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  idUser: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  score: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  totalCorrect: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  totalAnswers: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  time: string;
}
