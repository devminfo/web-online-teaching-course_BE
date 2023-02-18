import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ObjectId } from 'mongodb';
import { CoordinatesType } from 'src/util/types/coordinates.type';
import { CoordinatesDto } from 'src/util/types/dto/coordinates.dto';

export default class CreateShopDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly idOwner: ObjectId;

  @IsOptional()
  @IsNotEmpty()
  readonly idUserBank: ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  readonly idProvince: ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  readonly idDistrict: ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  readonly idVillage: ObjectId;

  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly phone: string;

  @IsOptional()
  @IsString()
  readonly street: string;

  @IsOptional()
  @IsString()
  readonly productDescription: string;

  @IsOptional()
  @IsString()
  readonly emailBill: string;

  @IsOptional()
  @IsString()
  readonly reconciliationTime: string;

  @IsOptional()
  @IsString()
  readonly policy: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CoordinatesDto)
  readonly coordinates: CoordinatesType;

  @IsOptional()
  @IsString()
  readonly taxCODE: string;
}
