import { ObjectId } from 'mongodb';
import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Course {
  @Prop({ type: String, default: '' })
  readonly idCategories: String;

  @Prop({ type: String, default: '' })
  readonly instructors: {
    position: number;
    idUser: string;
    fullName: string;
  }[];

  @Prop({ type: String, default: '' })
  readonly title: String;

  @Prop({ type: String, default: '' })
  readonly target: String;

  @Prop({ type: String, default: '' })
  readonly targetDetails: { position: number; text: string; icon: string }[];

  @Prop({ type: String, default: '' })
  readonly totalChapter: String;

  @Prop({ type: String, default: '' })
  readonly totalLectures: String;

  @Prop({ type: String, default: '' })
  readonly totalTime: String;

  @Prop({ type: String, default: '' })
  readonly requirements: { position: number; text: string; icon: string }[];

  @Prop({ type: String, default: '' })
  readonly desc: String;

  @Prop({ type: String, default: '' })
  readonly isFree: String;

  @Prop({ type: String, default: '' })
  readonly price: String;

  @Prop({ type: String, default: '' })
  readonly promotionPrice: String;

  @Prop({ type: String, default: '' })
  readonly thumbnail: String;

  @Prop({ type: String, default: '' })
  readonly totalViews: String;

  @Prop({ type: String, default: '' })
  readonly totalLikes: String;

  @Prop({ type: String, default: '' })
  readonly totalDislikes: String;

  @Prop({ type: String, default: '' })
  readonly tags: string[];

  @Prop({ type: String, default: '' })
  readonly isPrivate: string;

  @Prop({ type: String, default: '' })
  readonly usersJoined: string[];

  @Prop({ type: String, default: '' })
  readonly classesJoined: string[];
}

export type CourseDocument = Course & Document;
export const CourseSchema = SchemaFactory.createForClass(Course);
