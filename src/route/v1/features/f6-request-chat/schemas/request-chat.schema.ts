import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class RequestChat {
  @Prop({ type: String, default: '' })
  readonly title: string;

  @Prop({ type: String, default: '' })
  readonly link: string;

  @Prop({ type: Boolean, default: '' })
  readonly isShow: boolean;
}

export type RequestChatDocument = RequestChat & Document;
export const RequestChatSchema = SchemaFactory.createForClass(RequestChat);
