import { Document, Schema as MongooseSchema } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class District {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: 'Province',
    required: true,
  })
  idProvince: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String })
  type: string;

  @Prop({ type: String })
  slug: string;
}

export type DistrictDocument = District & Document;
export const DistrictSchema = SchemaFactory.createForClass(District);
