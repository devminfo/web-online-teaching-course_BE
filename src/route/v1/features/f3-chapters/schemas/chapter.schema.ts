import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Chapter {
  @Prop({ type: String, ref: 'Course' })
  readonly idCourse: string;

  @Prop({ type: String, default: '' })
  readonly title: string;

  @Prop({ type: Number, default: 0 })
  readonly position: number;

  @Prop({ type: [{ type: String, ref: 'Lecture' }], default: [] })
  readonly lectures: string[];
}

export type ChapterDocument = Chapter & Document;
export const ChapterSchema = SchemaFactory.createForClass(Chapter);
