import { Document } from 'mongoose';

import { MethodRouteEnum } from '@enum/method-route.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class GroupApi {
  @Prop({
    type: [{ type: String, enum: MethodRouteEnum }],
    default: [
      MethodRouteEnum.GET,
      MethodRouteEnum.POST,
      MethodRouteEnum.PUT,
      MethodRouteEnum.DELETE,
    ],
  })
  accessMethods: MethodRouteEnum[];

  @Prop({ type: String, required: true })
  url: string; // url tuyệt đối

  @Prop({ type: String })
  collectionName: string;
}

export type GroupApiDocument = GroupApi & Document;
export const GroupApiSchema = SchemaFactory.createForClass(GroupApi);
