import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Course } from '@features/f2-courses/schemas/course.schema';

@Schema({ timestamps: true, versionKey: false })
export class LectureGroup {
  @Prop({ type: String, ref: 'Course' })
  readonly idCourse: string;

  @Prop({ type: String, default: '' })
  readonly title: string;

  @Prop({ type: Number, default: '' })
  readonly position: number;
}

export type LectureGroupDocument = LectureGroup & Document;
export const LectureGroupSchema = SchemaFactory.createForClass(LectureGroup);
