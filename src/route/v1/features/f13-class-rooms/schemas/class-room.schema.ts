import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class ClassRoom {
  @Prop({ type: [{ type: String, ref: 'User' }], default: [] })
  readonly members: string[];

  @Prop({ type: String, ref: 'Teacher', required: true })
  readonly teacher: string;

  @Prop({ type: String, default: '' })
  readonly name: string;

  @Prop({ type: String, default: '' })
  readonly thumbnail: string;

  @Prop({ type: String, default: '' })
  readonly desc: string;

  @Prop({ type: [{ type: String, ref: 'Course' }], default: [] })
  readonly courses: string[];

  @Prop({ type: Number, default: 0 })
  readonly startTime: number;

  @Prop({ type: Number, default: 0 })
  readonly endTime: number;

  @Prop({ type: String, default: 'NEW' })
  readonly status: string;
}

export type ClassRoomDocument = ClassRoom & Document;
export const ClassRoomSchema = SchemaFactory.createForClass(ClassRoom);
