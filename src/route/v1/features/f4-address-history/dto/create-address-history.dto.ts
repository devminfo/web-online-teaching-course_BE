import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ObjectId } from 'mongodb';
import { CoordinatesType } from 'src/util/types/coordinates.type';
import { CoordinatesDto } from 'src/util/types/dto/coordinates.dto';

export default class CreateAddressHistoryDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly idOwner: ObjectId;

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
  readonly street: string;

  @IsOptional()
  @IsString()
  readonly storeName: string;

  @IsOptional()
  @IsString()
  readonly phone: string;

  @IsOptional()
  @IsBoolean()
  readonly isDefault: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => CoordinatesDto)
  readonly coordinates: CoordinatesType;
}
