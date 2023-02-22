import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '@authorization/a1-user/schemas/user.schema';

@Schema({ timestamps: true, versionKey: false })
export class Post {
  @Prop({ type: String, ref: 'User' })
  readonly author: string;

  @Prop({ type: String, default: '' })
  readonly title: string;

  @Prop({ type: String, default: '' })
  readonly content: string;

  @Prop({ type: String, default: '' })
  readonly thumbnail: string;

  @Prop({ type: Number, default: 0 })
  readonly totalLikes: number;

  @Prop({ type: Number, default: 0 })
  readonly totalViews: number;

  @Prop({ type: [String], default: [] })
  readonly tags: string[];

  @Prop({ type: [{ type: String, ref: 'User' }], default: '' })
  readonly likes: string[];
}

export type PostDocument = Post & Document;
export const PostSchema = SchemaFactory.createForClass(Post);
