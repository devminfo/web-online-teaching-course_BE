import { IsBoolean, IsOptional } from 'class-validator';

import { OmitType, PartialType } from '@nestjs/mapped-types';

import CreateUserDto from './create-user.dto';

export default class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, [
    'password',
    'role',
    'groups',
    'groupDetails',
    'groupAPIAccesses',
    'groupAPIDenines',
  ] as const),
) {
  @IsOptional()
  @IsBoolean()
  deleted?: boolean;
}
