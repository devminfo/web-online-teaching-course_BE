import { IsNotEmpty, IsString } from 'class-validator';

export default class verifyEmailDto {
  @IsNotEmpty()
  @IsString()
  readonly token: string;
}
