import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MinLength,
} from 'class-validator';

export default class SignInDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Length(6, 50)
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsOptional()
  @MinLength(12)
  deviceID?: string;
}
