import { Type } from 'class-transformer';
import {
  IsArray, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString, ValidateNested,
} from 'class-validator';
import { ReplyDto } from 'src/util/types/dto/reply.dto';

import { CommentTypeEnum } from '@enum/9.comment-type.enum';

export default class CreateCommentDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly author: string;

  @IsNotEmpty()
  @IsMongoId()
  readonly idEntity: string;

  @IsNotEmpty()
  @IsEnum(CommentTypeEnum)
  readonly type: CommentTypeEnum;

  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsNotEmpty()
  @IsString()
  readonly image: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ReplyDto)
  readonly replies: ReplyDto[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly likes: string[];
}
