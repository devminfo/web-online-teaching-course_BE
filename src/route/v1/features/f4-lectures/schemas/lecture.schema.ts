import { Document } from 'mongoose';

import { LectureTypeEnum } from '@enum/8.lecture-type.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Lecture {
  @Prop({ type: String, ref: 'Chapter' })
  readonly idChapter: string;

  @Prop({ type: String, enum: LectureTypeEnum, default: LectureTypeEnum.VIDEO })
  readonly type: LectureTypeEnum;

  @Prop({ type: String, default: '' })
  readonly title: string;

  @Prop({ type: String, default: '' })
  readonly url: string;

  @Prop({ type: Number, default: 0 })
  readonly position: number;

  @Prop({ type: Number, default: 0 })
  readonly lesson: number;

  @Prop({ type: Number, default: 0 })
  readonly totalTimes: number;
}

export type LectureDocument = Lecture & Document;
export const LectureSchema = SchemaFactory.createForClass(Lecture);
