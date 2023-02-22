import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { DescItemDto } from 'src/util/types/dto/desc-item.dto';
import { ClassRoom } from '@features/f13-class-rooms/schemas/class-room.schema';
import { User } from '@authorization/a1-user/schemas/user.schema';

@Schema({ timestamps: true, versionKey: false })
export class Course {
  @Prop({ type: [{ type: String, ref: 'User' }], default: [] })
  readonly idCategories: string[];

  @Prop({ type: [{ type: String, ref: 'User' }], default: [] })
  readonly instructors: string[];

  @Prop({ type: String, default: '' })
  readonly title: string;

  @Prop({ type: String, default: '' })
  readonly target: string;

  @Prop({
    type: [
      {
        position: Number,
        text: String,
        icon: String,
      },
    ],
    default: [],
  })
  readonly targetDetails: DescItemDto[];

  @Prop({ type: Number, default: 0 })
  readonly totalChapter: number;

  @Prop({ type: Number, default: 0 })
  readonly totalLectures: number;

  @Prop({ type: Number, default: 0 })
  readonly totalTime: number;

  @Prop({
    type: [
      {
        position: Number,
        text: String,
        icon: String,
      },
    ],
    default: [],
  })
  readonly requirements: DescItemDto[];

  @Prop({ type: String, default: '' })
  readonly desc: string;

  @Prop({ type: Number, default: 0 })
  readonly price: number;

  @Prop({ type: Number, default: 0 })
  readonly promotionPrice: number;

  @Prop({ type: String, default: '' })
  readonly thumbnail: string;

  @Prop({ type: String, default: '' })
  readonly totalViews: number;

  @Prop({ type: Number, default: 0 })
  readonly totalLikes: string;

  @Prop({ type: Number, default: 0 })
  readonly totalDislikes: number;

  @Prop({ type: [String], default: [] })
  readonly tags: string[];

  @Prop({ type: Boolean, default: false })
  readonly isPrivate: boolean;

  @Prop({ type: [{ type: String, ref: 'User' }], default: [] })
  readonly usersJoined: string[];

  @Prop({ type: [{ type: String, ref: ClassRoom.name }], default: [] })
  readonly classesJoined: string[];
}

export type CourseDocument = Course & Document;
export const CourseSchema = SchemaFactory.createForClass(Course);
