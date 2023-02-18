import { ObjectId } from 'mongodb';
import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ShipperOrderTypeEnum } from '@enum/11.shipper-order-type.enum';
import { CoordinatesType } from 'src/util/types/coordinates.type';

@Schema({ timestamps: true, versionKey: false })
export class ShipperOrder {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  readonly shipper: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Order' })
  readonly idOrder: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'UserBank' })
  readonly idShop: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Province' })
  readonly idProvinceFrom: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'District' })
  readonly idDistrictFrom: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Village' })
  readonly idVillageFrom: ObjectId;

  @Prop({ type: String, default: '' })
  readonly streetFrom: string;

  @Prop({ type: Types.ObjectId, ref: 'UserBank' })
  readonly idOrderUserBank: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Province' })
  readonly idOrderProvinceFrom: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'District' })
  readonly idOrderDistrictFrom: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Village' })
  readonly idOrderVillageFrom: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Province' })
  readonly idOrderProvinceTo: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'District' })
  readonly idOrderDistrictTo: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Village' })
  readonly idOrderVillageTo: ObjectId;

  @Prop({ type: String, default: '' })
  readonly orderStreetFrom: string;

  @Prop({ type: String, default: '' })
  readonly orderStreetTo: string;

  @Prop({ type: String, enum: ShipperOrderTypeEnum })
  readonly type: ShipperOrderTypeEnum;

  @Prop({ type: Number, default: 0 })
  readonly estimatePickupDate: number;

  @Prop({ type: Number, default: 0 })
  readonly orderCollectMoney: number;

  @Prop({ type: { lat: Number, long: Number }, default: {} })
  readonly coordinatesFrom: CoordinatesType;

  @Prop({ type: { lat: Number, long: Number }, default: {} })
  readonly coordinatesTo: CoordinatesType;

  @Prop({ type: { lat: Number, long: Number }, default: {} })
  readonly coordinatesPickup: CoordinatesType;

  @Prop({ type: Number, default: 0 })
  readonly distance: number;

  @Prop({ type: Number, default: 0 })
  readonly pickupDate: number;

  @Prop({ type: Number, default: 0 })
  readonly customerMoney: number;

  @Prop({ type: String, default: '' })
  readonly pictureOrderSent: string;

  @Prop({ type: String, default: '' })
  readonly reasonOrderRefund: string;
}

export type ShipperOrderDocument = ShipperOrder & Document;
export const ShipperOrderSchema = SchemaFactory.createForClass(ShipperOrder);
