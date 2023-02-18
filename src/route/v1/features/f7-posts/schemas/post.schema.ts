import { ObjectId } from 'mongodb';
import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Post {
  @Prop({ type: String, default: '' })
  readonly author: string;

  @Prop({ type: String, default: '' })
  readonly title: string;

  @Prop({ type: String, default: '' })
  readonly content: string;

  @Prop({ type: String, default: '' })
  readonly thumbnail: string;

  @Prop({ type: String, default: '' })
  readonly totalLikes: string;

  @Prop({ type: String, default: '' })
  readonly totalViews: string;

  @Prop({ type: String, default: '' })
  readonly tags: string[];

  @Prop({ type: String, default: '' })
  readonly likes: string[];
}

export type PostDocument = Post & Document;
export const PostSchema = SchemaFactory.createForClass(Post);
