import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdatePassword {
  @IsNotEmpty()
  @IsString()
  @Length(6, 50)
  readonly password!: string;

  @IsNotEmpty()
  @IsString()
  @Length(6, 50)
  readonly newPassword: string;
}
