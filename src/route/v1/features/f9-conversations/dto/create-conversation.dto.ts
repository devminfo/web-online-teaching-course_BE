import {
  IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString,
} from 'class-validator';
import { ObjectId } from 'mongodb';

export default class CreateConversationDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly users: string[];

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly chatName: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly isGroup: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly avatar: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly latestMessage: { idUser: string; text: string };

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly admin: string;
}
