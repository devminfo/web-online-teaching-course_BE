import { Document, Schema as MongooseSchema } from 'mongoose';

import { MethodRouteEnum } from '@enum/method-route.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class History {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  idUser: string;

  @Prop({ type: MethodRouteEnum, default: MethodRouteEnum.GET })
  method: MethodRouteEnum;

  @Prop({ type: String, default: 'READ' })
  action: string;

  @Prop({ type: String, required: true })
  url: string;
}

export type HistoryDocument = History & Document;
export const HistorySchema = SchemaFactory.createForClass(History);
