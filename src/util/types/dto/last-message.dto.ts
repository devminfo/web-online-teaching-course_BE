import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { UserInfoDto } from './user-info.dto';

export class LastMessageDto {
  @IsOptional()
  @ValidateNested()
  @Type(() => UserInfoDto)
  user: UserInfoDto;

  @IsOptional()
  @IsString()
  text: string;
}
