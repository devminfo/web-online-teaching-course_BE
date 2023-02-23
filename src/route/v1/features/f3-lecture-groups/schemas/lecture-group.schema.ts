import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class LectureGroup {
  @Prop({ type: String, ref: 'Course' })
  readonly idCourse: string;

  @Prop({ type: String, default: '' })
  readonly title: string;

  @Prop({ type: Number, default: 0 })
  readonly position: number;
}

export type LectureGroupDocument = LectureGroup & Document;
export const LectureGroupSchema = SchemaFactory.createForClass(LectureGroup);
