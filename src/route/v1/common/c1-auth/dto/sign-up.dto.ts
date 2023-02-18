import {
  IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, MaxLength, MinLength,
} from 'class-validator';

import CreateUserDto from '@authorization/a1-user/dto/create-user.dto';
import { RoleUserEnum } from '@enum/role-user.enum';
import { PartialType } from '@nestjs/mapped-types';

export default class SignupDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsEmail()
  @MinLength(3)
  @MaxLength(128)
  readonly email: string;

  @IsOptional()
  @IsString()
  @MinLength(12)
  readonly deviceID: string;

  @IsString()
  @Length(6, 50)
  readonly password!: string;

  @IsEnum(RoleUserEnum)
  role: RoleUserEnum = RoleUserEnum.customer;

  @IsNotEmpty()
  @Length(4)
  readonly otpCode: string;
}
