import { Type } from 'class-transformer';
import {
  IsArray, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested,
} from 'class-validator';
import { AnswerDto } from 'src/util/types/dto/answer.dto';

export default class CreateQuestionDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly author: string;

  @IsNotEmpty()
  @IsString()
  readonly type: string;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly desc: string;

  @IsNotEmpty()
  @IsString()
  readonly images: string[];

  @IsOptional()
  @IsNumber()
  readonly totalViews: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AnswerDto)
  readonly answers: AnswerDto[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly likes: string[];
}
