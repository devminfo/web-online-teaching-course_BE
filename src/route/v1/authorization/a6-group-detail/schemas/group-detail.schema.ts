import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class GroupDetail {
  @Prop({ type: String, required: true })
  collectionName: string;

  @Prop({ type: Boolean, default: false })
  isGroup: boolean;

  @Prop({ type: String, default: '' })
  name: string;

  @Prop({
    type: String,
    default: './assets/media/icons/duotune/general/gen019.svg',
  })
  icon: string;

  @Prop({ type: Number })
  position: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'GroupDetail' }], default: [] })
  childs: string[];

  @Prop({ type: [String], default: [] })
  refers: string[]; // Danh sách các collectionName được phép truy cập

  @Prop({ type: Boolean, default: false })
  isChild: boolean;

  @Prop({ type: String, default: '' })
  link: String;

  @Prop({ type: Boolean, default: false })
  isHorizontalMenu: boolean;
}

export type GroupDetailDocument = GroupDetail & Document;
export const GroupDetailSchema = SchemaFactory.createForClass(GroupDetail);
