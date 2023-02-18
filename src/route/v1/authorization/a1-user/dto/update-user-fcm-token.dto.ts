import { IsNotEmpty, IsString } from 'class-validator';

export default class UpdateUserFcmTokenDto {
  @IsNotEmpty()
  @IsString()
  readonly fcmToken?: string;
}
