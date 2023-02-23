import { Type } from 'class-transformer';
import {
  IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested,
} from 'class-validator';
import { QuizContentDto } from 'src/util/types/dto/quiz-content.dto';

export default class CreateTestQuestionDto {
  @IsOptional()
  @IsNumber()
  readonly position: number;

  @IsOptional()
  @IsNumber()
  readonly total: number;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly desc: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly images: string[];

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuizContentDto)
  readonly content: QuizContentDto[];

  @IsOptional()
  @IsNumber()
  readonly startTime: number;

  @IsOptional()
  @IsNumber()
  readonly endTime: number;

  @IsOptional()
  @IsNumber()
  readonly minTime: number;
}
