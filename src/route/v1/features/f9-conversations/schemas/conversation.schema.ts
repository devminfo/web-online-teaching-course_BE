import { ObjectId } from 'mongodb';
import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Conversation {
  @Prop({ type: String, default: '' })
  readonly users: string[];

  @Prop({ type: String, default: '' })
  readonly chatName: string;

  @Prop({ type: String, default: '' })
  readonly isGroup: string;

  @Prop({ type: String, default: '' })
  readonly avatar: string;

  @Prop({ type: String, default: '' })
  readonly latestMessage: { idUser: string; text: string };

  @Prop({ type: String, default: '' })
  readonly admin: string;
}

export type ConversationDocument = Conversation & Document;
export const ConversationSchema = SchemaFactory.createForClass(Conversation);
