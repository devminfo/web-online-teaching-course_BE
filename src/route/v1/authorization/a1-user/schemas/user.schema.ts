import bcrypt from 'bcryptjs';
import { ObjectId } from 'mongodb';
import { Document, Types } from 'mongoose';

import { GenderEnum } from '@enum/1.gender.enum';
import { MethodRouteEnum } from '@enum/method-route.enum';
import { RoleUserEnum } from '@enum/role-user.enum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { GroupDetailType } from 'src/util/types';
import { ReceivedNotificationTypeEnum } from '@enum/7.received-notification-type.enum ';

@Schema({ timestamps: true, versionKey: false })
export class User {
  // Authorizations
  @Prop({ type: [{ type: Types.ObjectId, ref: 'Group' }] })
  groups: string[];

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

  @Prop({ type: [{ type: Types.ObjectId, ref: 'GroupApi' }] })
  groupAPIAccesses: string[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'GroupApi' }] })
  groupAPIDenines: string[];

  @Prop({ type: Types.ObjectId, ref: 'Province' })
  readonly idProvince: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'District' })
  readonly idDistrict: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Village' })
  readonly idVillage: ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'Shop' })
  readonly idShop: ObjectId;

  @Prop({ type: String, enum: RoleUserEnum, default: RoleUserEnum.customer })
  readonly role: RoleUserEnum = RoleUserEnum.customer;

  @Prop({ type: String, default: '' })
  readonly fullName: string;

  @Prop({
    type: String, slug: 'fullName', index: true, unique: true
  })
  readonly slug: string;

  @Prop({ type: String, default: '' })
  readonly phone: string;

  @Prop({ type: String, default: '' })
  readonly email: string;

  @Prop({ type: String, default: '' })
  readonly street: string;

  @Prop({ type: String, default: '' })
  readonly avatar: string;

  @Prop({ type: GenderEnum, default: GenderEnum.FEMALE })
  readonly gender: GenderEnum = GenderEnum.FEMALE;

  @Prop({ type: String, select: false })
  password: string;

  @Prop({ type: Number, default: 0 })
  readonly dateOfBirth: number;

  @Prop({ type: String, default: '', select: false })
  readonly tokenLogin: string;

  @Prop({ type: Boolean, default: true })
  readonly isEnableFCM: boolean;

  @Prop({ type: String, default: '' })
  deviceID: string;

  @Prop({ type: [String], default: [] })
  fcmTokens: string[];

  @Prop({ type: Boolean, default: false })
  readonly isDeleted: boolean;

  @Prop({
    type: [{ type: String, enum: ReceivedNotificationTypeEnum }],
    default: [],
  })
  readonly receivedNotificationTypes: ReceivedNotificationTypeEnum[];

  comparePassword: (candidatePassword: string) => boolean;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

/* eslint func-names: 0 */
// Pre save
UserSchema.pre('save', async function (next: any) {
  const user = this as UserDocument;

  // if (user.isModified('email')) {
  //   user.username = user.email.split('@')[0].trim();
  // }

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) {
    return next();
  }

  // Hash password
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(user.password, salt);

  return next();
});
