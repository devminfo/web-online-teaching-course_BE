import { ObjectId } from 'mongodb';
import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Lecture {
  @Prop({ type: String, default: '' })
  type: 'VIDEO' | 'QUIZ' | 'FILE';

  @Prop({ type: String, default: '' })
  title: string;

  @Prop({ type: String, default: '' })
  url: 'URL_VIDEO' | 'ID_QUIZ' | 'URL' | 'FILE';

  @Prop({ type: String, default: '' })
  position: string;

  @Prop({ type: String, default: '' })
  totalTimes: string;
}

export type LectureDocument = Lecture & Document;
export const LectureSchema = SchemaFactory.createForClass(Lecture);
