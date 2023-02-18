import { ObjectId } from 'mongodb';
import { Document, Types } from 'mongoose';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CoordinatesType } from 'src/util/types/coordinates.type';

@Schema({ timestamps: true, versionKey: false })
export class AddressHistory {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  readonly idOwner: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Province' })
  readonly idProvince: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'District' })
  readonly idDistrict: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Village' })
  readonly idVillage: ObjectId;

  @Prop({ type: String, default: '' })
  readonly street: string;

  @Prop({ type: String, default: '' })
  readonly storeName: string;

  @Prop({ type: String, default: '' })
  readonly phone: string;

  @Prop({ type: Boolean, default: false })
  readonly isDefault: boolean;

  @Prop({ type: { lat: Number, long: Number }, default: {} })
  readonly coordinates: CoordinatesType;
}

export type AddressHistoryDocument = AddressHistory & Document;
export const AddressHistorySchema = SchemaFactory.createForClass(AddressHistory);
