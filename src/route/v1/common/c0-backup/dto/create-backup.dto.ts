import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendBackupDataByEmailDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
