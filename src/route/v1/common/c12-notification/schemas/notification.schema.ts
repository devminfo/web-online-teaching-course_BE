import { ObjectId } from 'mongodb';
import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NotificationEntityTypeEnum } from '@enum/6.notification-entity-type.enum';

@Schema({ timestamps: true, versionKey: false })
export class Notification {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  readonly createdBy: ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  readonly usersReceived: ObjectId;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  readonly usersOpened: ObjectId;

  @Prop({
    type: String,
    enum: NotificationEntityTypeEnum,
    default: NotificationEntityTypeEnum.CARE_CUSTOMER,
  })
  readonly entityType: NotificationEntityTypeEnum;

  @Prop({ type: Types.ObjectId })
  readonly idEntity: ObjectId;

  @Prop({ type: String, default: '' })
  readonly title: string;

  @Prop({ type: String, default: '' })
  readonly thumbnail: string;

  @Prop({ type: String, default: '' })
  readonly content: string;

  @Prop({ type: String, default: '' })
  readonly summary: string;
}

export type NotificationDocument = Notification & Document;
export const NotificationSchema = SchemaFactory.createForClass(Notification);
