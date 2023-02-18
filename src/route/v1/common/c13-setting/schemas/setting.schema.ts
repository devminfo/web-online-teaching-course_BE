import { ObjectId } from 'mongodb';
import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Setting {
  @Prop({ type: String, default: '' })
  readonly logo: string;

  @Prop({ type: String, default: '' })
  readonly policy: string;

  @Prop({ type: String, default: '' })
  readonly timeZoneServer: string;

  @Prop({ type: String, default: '' })
  readonly timeZoneApp: string;

  @Prop({ type: String, default: '' })
  readonly accountName: string;

  @Prop({ type: String, default: '' })
  readonly accountNumber: string;

  @Prop({ type: String, default: '' })
  readonly bankName: string;

  @Prop({ type: String, default: '' })
  readonly bankBranch: string;
}

export type SettingDocument = Setting & Document;
export const SettingSchema = SchemaFactory.createForClass(Setting);
