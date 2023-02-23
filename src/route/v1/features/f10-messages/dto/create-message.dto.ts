import {
  IsArray, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString
} from 'class-validator';

import { FileTypeEnum } from '@enum/11.file-type.enum';

export default class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  readonly idConversation: string;

  @IsNotEmpty()
  @IsMongoId()
  readonly sender: string;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly readers: string[];

  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsNotEmpty()
  @IsEnum(FileTypeEnum)
  readonly fileType: FileTypeEnum;
}
