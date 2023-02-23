import {
  IsArray, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString
} from 'class-validator';

export default class CreatePlayQuizDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly idQuiz: string;

  @IsNotEmpty()
  @IsMongoId()
  readonly idUser: string;

  @IsOptional()
  @IsNumber()
  readonly score: number;

  @IsArray()
  @IsString({ each: true })
  readonly rightAnswers: string[];

  @IsOptional()
  @IsNumber()
  readonly totalQuestions: number;

  @IsOptional()
  @IsNumber()
  readonly startTime: number;

  @IsOptional()
  @IsNumber()
  readonly endTime: number;

  @IsOptional()
  @IsNumber()
  readonly timeLimit: number;
}
