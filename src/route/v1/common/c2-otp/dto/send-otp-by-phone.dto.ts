import { IsNotEmpty, IsString } from 'class-validator';

export class SendOtpByPhoneDto {
  @IsNotEmpty()
  @IsString()
  phone: string;
}
