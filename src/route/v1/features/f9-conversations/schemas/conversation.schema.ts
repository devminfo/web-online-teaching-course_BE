import { ObjectId } from 'mongodb';
import { Document, Types } from 'mongoose';
import { LastMessageDto } from 'src/util/types/dto/last-message.dto';
import { UserInfoDto } from 'src/util/types/dto/user-info.dto';

import { User } from '@authorization/a1-user/schemas/user.schema';
import { RoleConversationEnum } from '@enum/10.role-conversation.dto';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Conversation {
  @Prop({ type: String, ref: 'ClassRoom', required: true })
  readonly idClassRoom: string[];

  @Prop({ type: String, ref: 'User', required: true })
  readonly createdBy: string[];

  @Prop({ type: [{ type: String, ref: 'User' }], default: [] })
  readonly users: string[];

  @Prop({ type: String, default: '' })
  readonly chatName: string;

  @Prop({ type: Boolean, default: false })
  readonly isGroup: boolean;

  @Prop({ type: String, default: '' })
  readonly avatar: string;

  @Prop({
    type: {
      user: {
        idUser: { type: String, ref: 'User' },
        fullName: { type: String },
        avatar: { type: String },
      },
      text: String,
    },
  })
  readonly latestMessage: LastMessageDto;
}

export type ConversationDocument = Conversation & Document;
export const ConversationSchema = SchemaFactory.createForClass(Conversation);
