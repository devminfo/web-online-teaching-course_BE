import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongodb';

export default class CreateUserTDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly idUser: ObjectId;

  @IsOptional()
  @IsString()
  readonly nickName: string;

  @IsOptional()
  @IsString()
  readonly accountNumber: string;

  @IsOptional()
  @IsString()
  readonly bankName: string;

  @IsOptional()
  @IsString()
  readonly bankBranch: string;

  @IsOptional()
  @IsString()
  readonly accountName: string;

  @IsOptional()
  @IsString()
  readonly isDefault: boolean;
}
