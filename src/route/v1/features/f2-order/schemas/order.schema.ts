import { ObjectId } from 'mongodb';
import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CoordinatesType } from 'src/util/types/coordinates.type';
import { PickupMethodEnum } from '@enum/8.pickup-method.enum  copy';
import { DeliveryMethodEnum } from '@enum/9.delivery-method.enum';
import { ProductDetailType } from 'src/util/types';
import { OrderStatusEnum } from '@enum/10.order-status-method.enum';
import { ShippingHistoryType } from 'src/util/types/shipping-history.type';
import { AreaVNEnum } from '@enum/12.area-vn.enum';

@Schema({ timestamps: true, versionKey: false })
export class Order {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  readonly createdBy: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Province' })
  readonly idProvinceFrom: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'District' })
  readonly idDistrictFrom: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Village' })
  readonly idVillageFrom: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Province' })
  readonly idProvinceTo: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'District' })
  readonly idDistrictTo: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Village' })
  readonly idVillageTo: ObjectId;

  @Prop({ type: String, default: '' })
  readonly streetFrom: string;

  @Prop({ type: String, default: '' })
  readonly streetTo: string;

  @Prop({ type: Types.ObjectId, ref: 'UserBank' })
  readonly idUserBank: string;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  readonly idShipperOrder: string;

  @Prop({ type: { lat: Number, long: Number }, default: {} })
  readonly coordinatesFrom: CoordinatesType;

  @Prop({ type: { lat: Number, long: Number }, default: {} })
  readonly coordinatesTo: CoordinatesType;

  @Prop({ type: String, default: '' })
  readonly customerPhone: string;

  @Prop({ type: String, default: '' })
  readonly customerName: string;

  @Prop({ type: String, enum: PickupMethodEnum, default: '' })
  readonly pickUpMethod: PickupMethodEnum;

  @Prop({ type: String, enum: DeliveryMethodEnum, default: '' })
  readonly deliveryMethod: DeliveryMethodEnum;

  @Prop({ type: String, default: '' })
  readonly productTitle: string;

  @Prop({ type: Number, default: 0 })
  readonly productPrice: number;

  @Prop({ type: Number, default: 0 })
  readonly collectMoney: number;

  @Prop({
    type: {
      weight: Number,
      height: Number,
      width: Number,
      length: Number,
      note: String,
    },
    default: {},
  })
  readonly productDetail: ProductDetailType;

  @Prop({ type: String, default: '' })
  readonly note: string;

  @Prop({ type: Boolean, default: true })
  readonly isAgreeUserTerm: boolean;

  @Prop({ type: Number, default: 0 })
  readonly moneyDelivery: number;

  @Prop({ type: Number, default: 0 })
  readonly shippingCODFee: number;

  @Prop({ type: Number, default: 0 })
  readonly insuranceFee: number;

  @Prop({ type: Number, default: 0 })
  readonly taxVAT: number;

  @Prop({ type: Number, default: 0 })
  readonly totalCostShipping: number;

  @Prop({ type: String, enum: OrderStatusEnum })
  readonly status: OrderStatusEnum;

  @Prop({ type: Number, default: 0 })
  readonly confirmedDate: number;

  @Prop({ type: String, default: '' })
  readonly orderCODE: string;

  @Prop({ type: String, default: '' })
  readonly billOfLadingCODE: string;

  @Prop({ type: String, default: '' })
  readonly customerCODE: string;

  @Prop({ type: String, default: '' })
  readonly reconciliationMoney: string;

  @Prop({ type: String, default: '' })
  readonly reasonOrderRefund: string;

  @Prop({
    type: [
      {
        title: String,
        note: String,
        status: { type: String, enum: OrderStatusEnum },
        createdAt: Number,
      },
    ],
    default: [],
  })
  readonly shippingHistories: ShippingHistoryType[];

  @Prop({ type: Number, default: 0 })
  readonly transferFee: number;

  @Prop({ type: String, enum: AreaVNEnum, default: AreaVNEnum.CENTRAL })
  readonly area: AreaVNEnum;
}

export type OrderDocument = Order & Document;
export const OrderSchema = SchemaFactory.createForClass(Order);
