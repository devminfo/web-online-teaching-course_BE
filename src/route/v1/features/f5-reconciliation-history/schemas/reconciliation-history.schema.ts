import { ObjectId } from 'mongodb';
import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class ReconciliationHistory {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  readonly idUser: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Order' })
  readonly idOrder: ObjectId;

  @Prop({ type: String, default: '' })
  readonly moneyCOD: string;

  @Prop({ type: Number, default: 0 })
  readonly serviceFee: number;

  @Prop({ type: Number, default: 0 })
  readonly reconciliationMoney: number;

  @Prop({ type: Number, default: 0 })
  readonly reconciliationDateTime: number;

  @Prop({ type: Number, default: 0 })
  readonly transferDateTime: number;
}

export type ReconciliationHistoryDocument = ReconciliationHistory & Document;
export const ReconciliationHistorySchema = SchemaFactory.createForClass(
  ReconciliationHistory,
);
