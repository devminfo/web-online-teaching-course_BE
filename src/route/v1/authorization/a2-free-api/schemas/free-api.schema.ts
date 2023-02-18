import { Document } from 'mongoose';

import { MethodRouteEnum } from '@enum/method-route.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class FreeApi {
  @Prop({
    type: [{ type: String, enum: MethodRouteEnum }],
    default: [MethodRouteEnum.GET, MethodRouteEnum.POST],
  })
  accessMethods: MethodRouteEnum[];

  @Prop({ type: String, required: true })
  url: string;

  @Prop({ type: String })
  collectionName: string;
}

export type FreeApiDocument = FreeApi & Document;
export const FreeApiSchema = SchemaFactory.createForClass(FreeApi);
