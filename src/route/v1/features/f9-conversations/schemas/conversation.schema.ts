import { ObjectId } from 'mongodb';
import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '@authorization/a1-user/schemas/user.schema';
import { UserInfoDto } from 'src/util/types/dto/user-info.dto';
import { LastMessageDto } from 'src/util/types/dto/last-message.dto';
import { RoleConversationEnum } from '@enum/10.role-conversation.dto';

@Schema({ timestamps: true, versionKey: false })
export class Conversation {
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

  @Prop({
    type: String,
    enum: RoleConversationEnum,
    default: RoleConversationEnum.USER,
  })
  readonly role: RoleConversationEnum;
}

export type ConversationDocument = Conversation & Document;
export const ConversationSchema = SchemaFactory.createForClass(Conversation);
