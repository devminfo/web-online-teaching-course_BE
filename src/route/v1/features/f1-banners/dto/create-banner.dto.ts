import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export default class CreateBannerDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly image: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly position: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly isShow: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly link: string;
}
