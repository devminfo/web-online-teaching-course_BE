import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { QuizQuestionDto } from './quiz-question.dto';

export class QuizContentDto {
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => QuizContentDto)
  questions: QuizQuestionDto[];

  @IsOptional()
  @IsString()
  correctAnswer: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  incorrectAnswers: string[];

  @IsOptional()
  @IsNumber()
  position: number;
}
