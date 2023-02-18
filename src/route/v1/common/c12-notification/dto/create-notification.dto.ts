import { NotificationEntityTypeEnum } from '@enum/6.notification-entity-type.enum';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongodb';

export default class CreateNotificationDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly createdBy: ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  readonly idStore: ObjectId;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly usersReceived: ObjectId;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly usersOpened: ObjectId;

  @IsOptional()
  @IsEnum(NotificationEntityTypeEnum)
  readonly entityType: NotificationEntityTypeEnum;

  @IsOptional()
  @IsMongoId()
  readonly idEntity: ObjectId;

  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly thumbnail: string;

  @IsOptional()
  @IsString()
  readonly content: string;

  @IsOptional()
  @IsString()
  readonly summary: string;
}
