import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Banner {
  @Prop({ type: String, default: '' })
  readonly text: string;

  @Prop({ type: String, default: '' })
  readonly image: string;

  @Prop({ type: Number, default: 0 })
  readonly position: number;

  @Prop({ type: Boolean, default: true })
  readonly isShow: boolean;

  @Prop({ type: String, default: '' })
  readonly link: string;
}

export type BannerDocument = Banner & Document;
export const BannerSchema = SchemaFactory.createForClass(Banner);
