import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MethodRouteEnum } from '@enum/method-route.enum';
import { GroupDetailType } from 'src/util/types';

@Schema({ timestamps: true, versionKey: false })
export class Group {
  @Prop({ type: String, require: true, unique: true })
  name: string;

  @Prop({
    type: [
      {
        idGroupDetail: { type: Types.ObjectId, ref: 'GroupDetail' },
        accessMethods: {
          type: [{ type: String, enum: MethodRouteEnum }],
          default: [MethodRouteEnum.GET],
        },
        createdAt: { type: Date, default: Date.now() },
      },
    ],
    default: [],
  })
  groupDetails: GroupDetailType[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'GroupApi' }], default: [] })
  groupAPIAccesses: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'GroupApi' }], default: [] })
  groupAPIDenines: string[];
}

export type GroupDocument = Group & Document;
export const GroupSchema = SchemaFactory.createForClass(Group);
