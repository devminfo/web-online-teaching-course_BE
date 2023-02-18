import { ObjectId } from 'mongodb';
import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Message {
  @Prop({ type: String, default: '' })
  readonly idChat: string;

  @Prop({ type: String, default: '' })
  readonly sender: string;

  @Prop({ type: String, default: '' })
  readonly readers: string[];

  @Prop({ type: String, default: '' })
  readonly content: string;

  @Prop({ type: String, default: '' })
  readonly fileType: 'IMAGE' | 'FILE' | 'TEXT';
}

export type MessageDocument = Message & Document;
export const MessageSchema = SchemaFactory.createForClass(Message);
