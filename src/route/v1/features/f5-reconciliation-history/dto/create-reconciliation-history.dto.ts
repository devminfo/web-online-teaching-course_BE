import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongodb';

export default class CreateReconciliationHistoryDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly idUser: ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  readonly idOrder: ObjectId;

  @IsOptional()
  @IsString()
  moneyCOD: string;

  @IsOptional()
  @IsNumber()
  serviceFee: number;

  @IsOptional()
  @IsNumber()
  reconciliationMoney: number;

  @IsOptional()
  @IsNumber()
  reconciliationDateTime: number;

  @IsOptional()
  @IsNumber()
  transferDateTime: number;
}
