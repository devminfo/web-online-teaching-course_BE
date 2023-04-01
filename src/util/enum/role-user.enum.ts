import { SetMetadata } from '@nestjs/common';

export enum RoleUserEnum {
  root = 'root',
  admin = 'admin',
  member = 'member',
  guest = 'guest',

  manager = 'manager',
  customer = 'customer',
}

export enum TypeUserEnum {
  admin = 'ADMIN',
  student = 'STUDENT',
  teacher = 'TEACHER',
}
