import { IsBoolean, IsOptional, IsString } from 'class-validator';

export default class CreateRequestChatDto {
  @IsOptional()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsString()
  readonly link: string;

  @IsOptional()
  @IsBoolean()
  readonly isShow: boolean;
}
