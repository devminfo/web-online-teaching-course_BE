import { Type } from 'class-transformer';
import {
  IsArray, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested,
} from 'class-validator';
import { QuizContentDto } from 'src/util/types/dto/quiz-content.dto';

export default class CreateQuizDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly createdBy: string;

  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly desc: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuizContentDto)
  readonly content: QuizContentDto[];

  @IsOptional()
  @IsNumber()
  readonly timeLimit: number;

  @IsOptional()
  @IsArray()
  @IsString()
  readonly tags: string[];
}
