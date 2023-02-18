import { ObjectId } from 'mongodb';
import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@Schema({ timestamps: true, versionKey: false })
export class LectureGroup {
  @Prop({ type: String, default: '' })
  readonly idCourse: string;

  @Prop({ type: String, default: '' })
  readonly title: string;

  @Prop({ type: String, default: '' })
  readonly position: string;
}

export type LectureGroupDocument = LectureGroup & Document;
export const LectureGroupSchema = SchemaFactory.createForClass(LectureGroup);
