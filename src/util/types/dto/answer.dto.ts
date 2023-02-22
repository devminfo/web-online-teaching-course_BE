import {
  IsArray, IsMongoId, IsOptional, IsString,
} from 'class-validator';

export class AnswerDto {
  @IsOptional()
  @IsMongoId()
  author: string;

  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  likes: string[];
}
