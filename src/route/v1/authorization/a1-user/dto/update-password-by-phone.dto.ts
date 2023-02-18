import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdatePasswordByPhoneDto {
  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 50)
  readonly password!: string;

  @IsNotEmpty()
  @Length(4)
  readonly otpCode: string;
}
