import { OrderStatusEnum } from '@enum/10.order-status-method.enum';
import {
  IsEnum, IsNumber, IsOptional, IsString
} from 'class-validator';

export class ShippingHistoryDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  note: string;

  @IsOptional()
  @IsEnum(OrderStatusEnum)
  status: OrderStatusEnum;

  @IsOptional()
  @IsNumber()
  createdAt: number;
}
