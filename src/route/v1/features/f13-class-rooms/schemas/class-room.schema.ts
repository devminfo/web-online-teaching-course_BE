import { ObjectId } from 'mongodb';
import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class ClassRoom {
  @Prop({ type: String, default: '' })
  members: string[];

  @Prop({ type: String, default: '' })
  teachers: string;

  @Prop({ type: String, default: '' })
  name: string;

  @Prop({ type: String, default: '' })
  administrators: { idUser: string; role: string }[];

  @Prop({ type: String, default: '' })
  courses: string[];
}

export type ClassRoomDocument = ClassRoom & Document;
export const ClassRoomSchema = SchemaFactory.createForClass(ClassRoom);
