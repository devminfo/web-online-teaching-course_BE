import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Category {
  @Prop({ type: String, default: '' })
  readonly title: string;

  @Prop({ type: String, default: '' })
  readonly desc: string;

  @Prop({ type: String, default: '' })
  readonly thumbnail: string;

  @Prop({ type: Number, default: 0 })
  readonly position: number;

  @Prop({ type: Boolean, default: false })
  readonly isNewCategory: boolean;
}

export type CategoryDocument = Category & Document;
export const CategorySchema = SchemaFactory.createForClass(Category);
