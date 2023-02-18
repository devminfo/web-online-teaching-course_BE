import { Document } from 'mongoose';

import { MethodRouteEnum } from '@enum/method-route.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class AuthUserAccess {
  @Prop({
    type: [{ type: String, enum: MethodRouteEnum }],
    default: [MethodRouteEnum.GET],
  })
  accessMethods: MethodRouteEnum[];

  @Prop({ type: String, required: true })
  url: string;

  @Prop({ type: String })
  collectionName: string;
}

export type AuthUserAccessDocument = AuthUserAccess & Document;
export const AuthUserAccessSchema = SchemaFactory.createForClass(AuthUserAccess);
