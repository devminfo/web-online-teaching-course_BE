import {
  IsArray, IsMongoId, IsOptional, IsString,
} from 'class-validator';

export class ReplyDto {
  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  image: string;

  @IsOptional()
  @IsMongoId()
  userTo: string;

  @IsOptional()
  @IsMongoId()
  userFrom: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  likes: string[];
}
