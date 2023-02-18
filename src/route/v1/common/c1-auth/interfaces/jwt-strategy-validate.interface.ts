import { Types } from 'mongoose';

import { RoleUserEnum } from '@enum/role-user.enum';

export interface JwtStrategyValidate {
  _id: Types.ObjectId;
  role: RoleUserEnum;
}
