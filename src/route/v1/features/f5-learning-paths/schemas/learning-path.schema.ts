import { Document } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { LearningPathGroupDto } from 'src/util/types/dto/learning-path-group.dto';

@Schema({ timestamps: true, versionKey: false })
export class LearningPath {
  @Prop({ type: String, default: '' })
  readonly title: string;

  @Prop({ type: String, default: '' })
  readonly desc: string;

  @Prop({ type: String, default: '' })
  readonly thumbnail: string;

  @Prop({
    type: {
      title: String,
      desc: String,
      courses: [
        {
          idCourse: { type: String, ref: 'Course' },
          isRelated: Boolean,
        },
      ],
    },
  })
  readonly learningPathGroups: LearningPathGroupDto[];
}

export type LearningPathDocument = LearningPath & Document;
export const LearningPathSchema = SchemaFactory.createForClass(LearningPath);
