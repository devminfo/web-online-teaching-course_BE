import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Seed {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String })
  link: string;
}

export type SeedDocument = Seed & Document;
export const SeedSchema = SchemaFactory.createForClass(Seed);
