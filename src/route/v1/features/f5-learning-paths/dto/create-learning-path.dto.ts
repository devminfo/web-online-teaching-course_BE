import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class CreateLearningPathDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly createdBy: string;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly desc: string;

  @IsNumber()
  readonly position: number;

  @IsNotEmpty()
  @IsString()
  readonly thumbnail: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly courses: string[];

  @IsOptional()
  @IsMongoId()
  readonly idParent: string;

  @IsOptional()
  @IsBoolean()
  readonly isParent: boolean;
}
