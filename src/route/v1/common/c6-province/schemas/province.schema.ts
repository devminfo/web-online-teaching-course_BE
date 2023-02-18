import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Province {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  type: string;

  @Prop({ type: String })
  slug: string;
}

export type ProvinceDocument = Province & Document;
export const ProvinceSchema = SchemaFactory.createForClass(Province);
