import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class CreateTestQuestionDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  position: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  total: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  desc: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  images: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  answers: { content: string; isCorrect: boolean }[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  startTime: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  endTime: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  minTime: string;
}
