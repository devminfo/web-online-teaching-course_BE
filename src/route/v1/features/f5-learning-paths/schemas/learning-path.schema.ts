import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class LearningPath {
  @Prop({ type: String, ref: 'User' })
  readonly createdBy: string;

  @Prop({ type: String, default: '' })
  readonly title: string;

  @Prop({ type: String, default: '' })
  readonly desc: string;

  @Prop({ type: Number, default: 0 })
  readonly position: number;

  @Prop({ type: String, default: '' })
  readonly thumbnail: string;

  @Prop({ type: [{ type: String, ref: 'Course' }] })
  readonly courses: string[];

  @Prop({ type: String, ref: 'LearningPath' })
  readonly idParent: string;

  @Prop({ type: Boolean, default: true })
  readonly isParent: boolean;
}

export type LearningPathDocument = LearningPath & Document;
export const LearningPathSchema = SchemaFactory.createForClass(LearningPath);
