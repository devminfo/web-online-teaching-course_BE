import {
  IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString,
} from 'class-validator';
import { ObjectId } from 'mongodb';

export default class CreateMessageDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly idChat: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly sender: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly readers: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly fileType: 'IMAGE' | 'FILE' | 'TEXT';
}
