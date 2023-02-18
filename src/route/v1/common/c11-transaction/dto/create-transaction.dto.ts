import {
  IsEnum, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString
} from 'class-validator';
import { ObjectId } from 'mongodb';

import { TransactionMethodEnum } from '@enum/2.transaction-method.enum';
import { TransactionStatusEnum } from '@enum/3.transaction-status.enum';
import { TransactionTypeEnum } from '@enum/4.transaction-type.enum';

export default class CreateTransactionDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly idUser: ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  readonly idServiceOrder: ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  readonly idStore: ObjectId;

  @IsOptional()
  @IsEnum(TransactionTypeEnum)
  readonly type: TransactionTypeEnum;

  @IsOptional()
  @IsEnum(TransactionMethodEnum)
  readonly method: TransactionMethodEnum;

  @IsOptional()
  @IsEnum(TransactionStatusEnum)
  readonly status: TransactionStatusEnum;

  @IsOptional()
  @IsString()
  readonly title: string;

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
  readonly accountNumber: string;

  @IsOptional()
  @IsString()
  readonly image: string;

  @IsOptional()
  @IsString()
  readonly content: string;

  @IsOptional()
  @IsNumber()
  readonly totalMoney: number;

  @IsOptional()
  @IsString()
  readonly unitMoney: string;
}
