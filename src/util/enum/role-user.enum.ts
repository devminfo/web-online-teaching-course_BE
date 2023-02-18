import { SetMetadata } from '@nestjs/common';

// eslint-disable-next-line no-shadow
export enum RoleUserEnum {
  root = 'root',
  admin = 'admin',
  member = 'member',
  guest = 'guest',

  manager = 'manager',
  customer = 'customer',
}

export const RoleUser = (...roleUser: RoleUserEnum[]) => SetMetadata('roleUser', roleUser);
