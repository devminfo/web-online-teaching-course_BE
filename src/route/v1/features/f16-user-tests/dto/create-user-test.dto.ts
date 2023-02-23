import {
  IsArray, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString
} from 'class-validator';

export default class CreateUserTestDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly testQuestion: string;

  @IsNotEmpty()
  @IsMongoId()
  readonly idUser: string;

  @IsOptional()
  @IsNumber()
  readonly score: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly correctQuestions: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly incorrectQuestions: string[];

  @IsOptional()
  @IsNumber()
  readonly starTime: number;

  @IsOptional()
  @IsNumber()
  readonly endTime: number;
}
