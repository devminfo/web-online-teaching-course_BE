import { ShipperOrderTypeEnum } from '@enum/11.shipper-order-type.enum';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ObjectId } from 'mongodb';
import { CoordinatesType } from 'src/util/types/coordinates.type';
import { CoordinatesDto } from 'src/util/types/dto/coordinates.dto';

export default class CreateShipperOrderDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly shipper: ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  readonly idOrder: ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  readonly idOrderUserBank: ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  readonly idShop: ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  readonly idProvinceFrom: ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  readonly idDistrictFrom: ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  readonly idVillageFrom: ObjectId;

  @IsOptional()
  @IsString()
  readonly streetFrom: string;

  @IsMongoId()
  @IsNotEmpty()
  readonly idOrderProvinceFrom: ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  readonly idOrderDistrictFrom: ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  readonly idOrderVillageFrom: ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  readonly idOrderProvinceTo: ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  readonly idOrderDistrictTo: ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  readonly idOrderVillageTo: ObjectId;

  @IsOptional()
  @IsString()
  readonly orderStreetFrom: string;

  @IsOptional()
  @IsString()
  readonly orderStreetTo: string;

  @IsOptional()
  @IsEnum(ShipperOrderTypeEnum)
  readonly type: ShipperOrderTypeEnum;

  @IsOptional()
  @IsNumber()
  readonly estimatePickupDate: number;

  @IsOptional()
  @IsNumber()
  readonly orderCollectMoney: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => CoordinatesDto)
  readonly coordinatesFrom: CoordinatesType;

  @IsOptional()
  @ValidateNested()
  @Type(() => CoordinatesDto)
  readonly coordinatesTo: CoordinatesType;

  @IsOptional()
  @ValidateNested()
  @Type(() => CoordinatesDto)
  readonly coordinatesPickup: CoordinatesType;

  @IsOptional()
  @IsNumber()
  readonly distance: number;

  @IsOptional()
  @IsNumber()
  readonly pickupDate: number;

  @IsOptional()
  @IsNumber()
  readonly customerMoney: number;

  @IsOptional()
  @IsString()
  readonly pictureOrderSent: string;

  @IsOptional()
  @IsString()
  readonly reasonOrderRefund: string;
}
