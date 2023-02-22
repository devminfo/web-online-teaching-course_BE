import { IsOptional, IsString } from 'class-validator';

export class QuizQuestionDto {
  @IsOptional()
  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsString()
  file: string;

  @IsOptional()
  @IsString()
  audio: string;
}
