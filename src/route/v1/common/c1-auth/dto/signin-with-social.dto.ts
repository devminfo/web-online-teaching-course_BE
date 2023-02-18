import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import CreateUserDto from '@authorization/a1-user/dto/create-user.dto';
import { PartialType } from '@nestjs/mapped-types';

export default class SigninWithSocialDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsString()
  tokenLogin: string;
}
