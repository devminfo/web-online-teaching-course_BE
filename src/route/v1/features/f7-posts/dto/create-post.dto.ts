import {
  IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString,
} from 'class-validator';
import { ObjectId } from 'mongodb';

export default class CreatePostDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly thumbnail: string;

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
  readonly tags: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly likes: string[];
}
