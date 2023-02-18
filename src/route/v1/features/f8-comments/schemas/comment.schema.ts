import { ObjectId } from 'mongodb';
import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Comment {
  @Prop({ type: String, default: '' })
  readonly author: string;

  @Prop({ type: String, default: '' })
  readonly idEntity: string;

  @Prop({ type: String, default: '' })
  readonly type: string;

  @Prop({ type: String, default: '' })
  readonly content: string;

  @Prop({ type: String, default: '' })
  readonly image: string;

  @Prop({ type: String, default: '' })
  readonly replies: {
    content: string;
    image: string;
    userTo: string;
    userFrom: string;
    likes: string;
  }[];

  @Prop({ type: String, default: '' })
  readonly likes: string[];
}

export type CommentDocument = Comment & Document;
export const CommentSchema = SchemaFactory.createForClass(Comment);
