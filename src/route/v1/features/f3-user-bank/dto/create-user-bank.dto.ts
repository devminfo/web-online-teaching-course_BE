import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongodb';

export default class CreateUserBankDto {
  @IsMongoId()
  @IsNotEmpty()
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
  @IsBoolean()
  readonly isDefault: boolean;
}
