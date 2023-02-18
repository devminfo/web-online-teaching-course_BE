import { ObjectId } from 'mongodb';
import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Banner {
  @Prop({ type: String, default: '' })
  readonly image: string;

  @Prop({ type: String, default: '' })
  readonly position: string;

  @Prop({ type: String, default: '' })
  readonly isShow: string;

  @Prop({ type: String, default: '' })
  readonly link: string;
}

export type BannerDocument = Banner & Document;
export const BannerSchema = SchemaFactory.createForClass(Banner);
