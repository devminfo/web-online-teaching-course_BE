import { ObjectId } from 'mongodb';
import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Category {
  @Prop({ type: String, default: '' })
  title: string;

  @Prop({ type: String, default: '' })
  desc: string;

  @Prop({ type: String, default: '' })
  position: string;
}

export type CategoryDocument = Category & Document;
export const CategorySchema = SchemaFactory.createForClass(Category);
