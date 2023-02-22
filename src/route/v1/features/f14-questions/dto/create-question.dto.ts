import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'mongodb';

export default class CreateQuestionDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly type: string;

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
  readonly images: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly totalLikes: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly totalViews: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly answers: { author: string; content: string; likes: string[] }[];
}
