import { OrderStatusEnum } from '@enum/10.order-status-method.enum';
import { AreaVNEnum } from '@enum/12.area-vn.enum';
import { PickupMethodEnum } from '@enum/8.pickup-method.enum  copy';
import { DeliveryMethodEnum } from '@enum/9.delivery-method.enum';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ObjectId } from 'mongodb';
import { ProductDetailType } from 'src/util/types';
import { CoordinatesType } from 'src/util/types/coordinates.type';
import { CoordinatesDto } from 'src/util/types/dto/coordinates.dto';
import { ProductDetailDto } from 'src/util/types/dto/product-detail.dto';
import { ShippingHistoryDto } from 'src/util/types/dto/shipping-history.dto';
import { ShippingHistoryType } from 'src/util/types/shipping-history.type';

export default class CreateOrderDto {
  @IsOptional()
  @IsMongoId()
  readonly createdBy: ObjectId;

  @IsOptional()
  @IsMongoId()
  readonly idProvinceFrom: ObjectId;

  @IsOptional()
  @IsMongoId()
  readonly idDistrictFrom: ObjectId;

  @IsOptional()
  @IsMongoId()
  readonly idVillageFrom: ObjectId;

  @IsOptional()
  @IsMongoId()
  readonly idProvinceTo: ObjectId;

  @IsOptional()
  @IsMongoId()
  readonly idDistrictTo: ObjectId;

  @IsOptional()
  @IsMongoId()
  readonly idVillageTo: ObjectId;

  @IsOptional()
  @IsString()
  readonly streetFrom: string;

  @IsOptional()
  @IsString()
  readonly streetTo: string;

  @IsOptional()
  @IsMongoId()
  readonly idUserBank: string;

  @IsOptional()
  @IsMongoId()
  readonly idShipperOrder: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => CoordinatesDto)
  readonly coordinatesFrom: CoordinatesType;

  @IsOptional()
  @ValidateNested()
  @Type(() => CoordinatesDto)
  readonly coordinatesTo: CoordinatesType;

  @IsOptional()
  @IsString()
  readonly customerPhone: string;

  @IsOptional()
  @IsString()
  readonly customerName: string;

  @IsOptional()
  @IsEnum(PickupMethodEnum)
  readonly pickUpMethod: PickupMethodEnum;

  @IsOptional()
  @IsEnum(DeliveryMethodEnum)
  readonly deliveryMethod: DeliveryMethodEnum;

  @IsOptional()
  @IsString()
  readonly productTitle: string;

  @IsOptional()
  @IsNumber()
  readonly productPrice: number;

  @IsOptional()
  @IsNumber()
  readonly collectMoney: number;

  @IsOptional()
  @ValidateNested()
  @Type(() => ProductDetailDto)
  readonly productDetail: ProductDetailType;

  @IsOptional()
  @IsString()
  readonly note: string;

  @IsOptional()
  @IsBoolean()
  readonly isAgreeUserTerm: boolean;

  @IsOptional()
  @IsNumber()
  readonly moneyDelivery: number;

  @IsOptional()
  @IsNumber()
  readonly shippingCODFee: number;

  @IsOptional()
  @IsNumber()
  readonly insuranceFee: number;

  @IsOptional()
  @IsNumber()
  readonly taxVAT: number;

  @IsOptional()
  @IsNumber()
  readonly totalCostShipping: number;

  @IsOptional()
  @IsEnum(OrderStatusEnum)
  readonly status: OrderStatusEnum;

  @IsOptional()
  @IsNumber()
  readonly confirmedDate: number;

  @IsOptional()
  @IsString()
  readonly orderCODE: string;

  @IsOptional()
  @IsString()
  readonly billOfLadingCODE: string;

  @IsOptional()
  @IsString()
  readonly customerCODE: string;

  @IsOptional()
  @IsString()
  readonly reconciliationMoney: string;

  @IsOptional()
  @IsString()
  readonly reasonOrderRefund: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => ShippingHistoryDto)
  readonly shippingHistories: ShippingHistoryType[];

  @IsOptional()
  @IsNumber()
  readonly transferFee: number;

  @IsOptional()
  @IsEnum(AreaVNEnum)
  readonly area: AreaVNEnum;
}
