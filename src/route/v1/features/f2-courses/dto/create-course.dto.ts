import { Type } from 'class-transformer';
import {
  IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested,
} from 'class-validator';
import { DescItemDto } from 'src/util/types/dto/desc-item.dto';

export default class CreateCourseDto {
  @IsNotEmpty()
  @IsArray()
  @IsMongoId({ each: true })
  readonly idCategories: string[];

  @IsNotEmpty()
  @IsArray()
  @IsMongoId({ each: true })
  readonly instructors: string[];

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly target: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DescItemDto)
  readonly targetDetails: DescItemDto[];

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
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DescItemDto)
  readonly requirements: DescItemDto[];

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
  @IsString()
  readonly totalViews: number;

  @IsOptional()
  @IsNumber()
  readonly totalLikes: string;

  @IsOptional()
  @IsNumber()
  readonly totalDislikes: number;

  @IsOptional()
  @IsArray({})
  @IsString({ each: true })
  readonly tags: string[];

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
