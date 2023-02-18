import { ObjectId } from 'mongodb';
import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CoordinatesType } from 'src/util/types/coordinates.type';

@Schema({ timestamps: true, versionKey: false })
export class Shop {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  readonly idOwner: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'UserBank' })
  readonly idUserBank: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Province' })
  readonly idProvince: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'District' })
  readonly idDistrict: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Village' })
  readonly idVillage: ObjectId;

  @Prop({ type: String, default: '' })
  readonly street: string;

  @Prop({ type: String, default: '' })
  readonly name: string;

  @Prop({ type: String, default: '' })
  readonly phone: string;

  @Prop({ type: String, default: '' })
  readonly productDescription: string;

  @Prop({ type: String, default: '' })
  readonly emailBill: string;

  @Prop({ type: String, default: '' })
  readonly reconciliationTime: string;

  @Prop({ type: String, default: '' })
  readonly policy: string;

  @Prop({ type: { lat: Number, long: Number }, default: {} })
  readonly coordinates: CoordinatesType;

  @Prop({ type: String, default: '' })
  readonly taxCODE: string;
}

export type ShopDocument = Shop & Document;
export const ShopSchema = SchemaFactory.createForClass(Shop);
