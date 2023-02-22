import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { LectureTypeEnum } from '@enum/8.lecture-type.enum';

@Schema({ timestamps: true, versionKey: false })
export class Lecture {
  @Prop({ type: String, enum: LectureTypeEnum, default: LectureTypeEnum.VIDEO })
  type: LectureTypeEnum;

  @Prop({ type: String, default: '' })
  title: string;

  @Prop({ type: String, default: '' })
  url: string;

  @Prop({ type: Number, default: 0 })
  position: number;

  @Prop({ type: Number, default: 0 })
  lesson: number;

  @Prop({ type: Number, default: 0 })
  totalTimes: number;
}

export type LectureDocument = Lecture & Document;
export const LectureSchema = SchemaFactory.createForClass(Lecture);
