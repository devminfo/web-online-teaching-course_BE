import {
  IsOptional, IsString, MaxLength, MinLength, ValidateIf
} from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export default class SignOutDto {
  @ApiProperty({ type: String, required: true })
  @IsString()
  @MinLength(3)
  @MaxLength(512)
  readonly fcmToken?: string;
}
