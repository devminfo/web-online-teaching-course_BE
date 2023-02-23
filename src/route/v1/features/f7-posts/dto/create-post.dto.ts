import {
  IsArray, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString
} from 'class-validator';

export default class CreatePostDto {
  @IsNotEmpty()
  @IsString()
  readonly author: string;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsNotEmpty()
  @IsString()
  readonly thumbnail: string;

  @IsOptional()
  @IsNumber()
  readonly totalLikes: number;

  @IsOptional()
  @IsNumber()
  readonly totalViews: number;

  @IsOptional()
  @IsArray()
  @IsString()
  readonly tags: string[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly likes: string[];
}
