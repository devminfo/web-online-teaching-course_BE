import { ObjectId } from 'mongodb';
import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Review {
  @Prop({ type: Types.ObjectId, ref: 'Order' })
  readonly idOrder: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'ShipperOrder' })
  readonly idShipperOrder: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Shop' })
  readonly idShop: ObjectId;

  @Prop({ type: Boolean, default: true })
  readonly isSatisfied: boolean;

  @Prop({ type: [String], default: [] })
  readonly satisfactions: string[];

  @Prop({ type: String, default: '' })
  readonly note: string;
}

export type ReviewDocument = Review & Document;
export const ReviewSchema = SchemaFactory.createForClass(Review);
