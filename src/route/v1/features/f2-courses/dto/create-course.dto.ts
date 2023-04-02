import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class CreateCourseDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly instructor: string;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly target: string;

  @IsOptional()
  @IsString()
  readonly targetDetails: string;

  @IsOptional()
  @IsNumber()
  readonly totalChapter: number;

  @IsOptional()
  @IsNumber()
  readonly totalLectures: number;

  @IsOptional()
  @IsNumber()
  readonly totalTime: number;

  @IsOptional()
  @IsString()
  readonly requirements: string;

  @IsOptional()
  @IsString()
  readonly desc: string;

  @IsOptional()
  @IsNumber()
  readonly price: number;

  @IsOptional()
  @IsNumber()
  readonly promotionPrice: number;

  @IsOptional()
  @IsString()
  readonly thumbnail: string;

  @IsOptional()
  @IsNumber()
  readonly totalViews: number;

  @IsOptional()
  @IsNumber()
  readonly totalLikes: string;

  @IsOptional()
  @IsNumber()
  readonly totalDislikes: number;

  @IsOptional()
  @IsString()
  readonly tags: string;

  @IsOptional()
  @IsBoolean()
  readonly isPrivate: boolean;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly usersJoined: string[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly classesJoined: string[];
}
