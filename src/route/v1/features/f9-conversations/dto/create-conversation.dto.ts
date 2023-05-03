import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { LastMessageDto } from 'src/util/types/dto/last-message.dto';

import { RoleConversationEnum } from '@enum/10.role-conversation.dto';

export default class CreateConversationDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly idClassRoom: string;

  @IsNotEmpty()
  @IsArray()
  @IsMongoId({ each: true })
  readonly users: string[];

  @IsOptional()
  @IsMongoId()
  readonly createdBy: string;

  @IsNotEmpty()
  @IsString()
  readonly chatName: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly isGroup: boolean;

  @IsOptional()
  @IsString()
  readonly avatar: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => LastMessageDto)
  readonly latestMessage: LastMessageDto;
}
