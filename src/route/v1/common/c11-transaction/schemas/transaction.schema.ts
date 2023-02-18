import { ObjectId } from 'mongodb';
import { Document, Types } from 'mongoose';

import { TransactionMethodEnum } from '@enum/2.transaction-method.enum';
import { TransactionStatusEnum } from '@enum/3.transaction-status.enum';
import { TransactionTypeEnum } from '@enum/4.transaction-type.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Transaction {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  readonly idUser: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'ServiceOrder' })
  readonly idServiceOrder: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Store' })
  readonly idStore: ObjectId;

  @Prop({
    type: String,
    enum: TransactionTypeEnum,
    default: TransactionTypeEnum.WITHDRAW_MONEY,
  })
  readonly type: TransactionTypeEnum;

  @Prop({
    type: String,
    enum: TransactionMethodEnum,
    default: TransactionMethodEnum.TRANSFER,
  })
  readonly method: TransactionMethodEnum;

  @Prop({
    type: String,
    enum: TransactionStatusEnum,
    default: TransactionStatusEnum.CHECKING,
  })
  readonly status: TransactionStatusEnum;

  @Prop({ type: String, default: '' })
  readonly title: string;

  @Prop({ type: String, default: '' })
  readonly bankName: string;

  @Prop({ type: String, default: '' })
  readonly bankBranch: string;

  @Prop({ type: String, default: '' })
  readonly accountName: string;

  @Prop({ type: String, default: '' })
  readonly accountNumber: string;

  @Prop({ type: String, default: '' })
  readonly image: string;

  @Prop({ type: String, default: '' })
  readonly content: string;

  @Prop({ type: Number, default: '' })
  readonly totalMoney: number;

  @Prop({ type: String, default: '' })
  readonly unitMoney: string;
}

export type TransactionDocument = Transaction & Document;
export const TransactionSchema = SchemaFactory.createForClass(Transaction);
