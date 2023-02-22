import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Conversation } from '@features/f9-conversations/schemas/conversation.schema';
import { User } from '@authorization/a1-user/schemas/user.schema';
import { FileTypeEnum } from '@enum/11.file-type.enum';

@Schema({ timestamps: true, versionKey: false })
export class Message {
  @Prop({ type: String, ref: 'Conversation' })
  readonly conversation: string;

  @Prop({ type: String, ref: 'User' })
  readonly sender: string;

  @Prop({ type: [{ type: String, ref: 'User' }], default: [] })
  readonly readers: string[];

  @Prop({ type: String, default: '' })
  readonly content: string;

  @Prop({ type: String, enum: FileTypeEnum, default: FileTypeEnum.TEXT })
  readonly fileType: FileTypeEnum;
}

export type MessageDocument = Message & Document;
export const MessageSchema = SchemaFactory.createForClass(Message);
