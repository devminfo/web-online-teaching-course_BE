import { Types } from 'mongoose';

import { RoleUserEnum } from '@enum/role-user.enum';
import { ApiProperty } from '@nestjs/swagger';

export default class UserEntity {
  @ApiProperty({ type: String })
  _id: Types.ObjectId = new Types.ObjectId();

  @ApiProperty({ type: 'enum', enum: RoleUserEnum })
  role: RoleUserEnum = RoleUserEnum.customer;

  @ApiProperty({ type: String })
  email: string = '';

  @ApiProperty({ type: String })
  phone: string = '';

  @ApiProperty({ type: String })
  zipCode: string = '+84';

  @ApiProperty({ type: String })
  country: string = 'VN';

  @ApiProperty({ type: String })
  password: string = '';

  @ApiProperty({ type: String })
  otpCode: string = '';

  @ApiProperty({ type: String })
  fcmToken: string[] = [];

  @ApiProperty({ type: Boolean })
  enableFCM: boolean = false;

  @ApiProperty({ type: String })
  deviceID: string = '';

  @ApiProperty({ type: String })
  fullName: string = '';
}
