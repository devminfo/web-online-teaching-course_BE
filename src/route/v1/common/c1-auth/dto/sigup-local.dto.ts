import {
  IsNotEmpty, IsString, Length, MaxLength, MinLength
} from 'class-validator';

import CreateUserDto from '@authorization/a1-user/dto/create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export default class SignupLocalDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsString()
  readonly phone: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(64)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly fullName: string;

  @IsNotEmpty()
  @Length(4)
  readonly otpCode: string;
}
