import {
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ObjectId } from 'mongodb';

export default class SigninLocalDto {
  @IsNotEmpty()
  @IsMongoId()
  idStore: ObjectId;

  @IsNotEmpty()
  @IsString()
  storeCode: string;

  @IsNotEmpty()
  @IsString()
  readonly phone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  readonly deviceID?: string;
}
