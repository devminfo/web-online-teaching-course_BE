import { Document } from 'mongoose';
import { ReplyDto } from 'src/util/types/dto/reply.dto';

import { CommentTypeEnum } from '@enum/9.comment-type.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Comment {
  @Prop({ type: String, ref: 'User' })
  readonly author: string;

  @Prop({ type: String })
  readonly idEntity: string;

  @Prop({ type: String, enum: CommentTypeEnum, default: '' })
  readonly type: CommentTypeEnum;

  @Prop({ type: String, default: '' })
  readonly content: string;

  @Prop({ type: String, default: '' })
  readonly image: string;

  @Prop({
    type: {
      content: String,
      image: String,
      userTo: { type: String, ref: 'User' },
      userFrom: { type: String, ref: 'User' },
      likes: [{ type: String, ref: 'User' }],
    },
    default: [],
  })
  readonly replies: ReplyDto[];

  @Prop({ type: [{ type: String, ref: 'User' }], default: [] })
  readonly likes: string[];
}

export type CommentDocument = Comment & Document;
export const CommentSchema = SchemaFactory.createForClass(Comment);
