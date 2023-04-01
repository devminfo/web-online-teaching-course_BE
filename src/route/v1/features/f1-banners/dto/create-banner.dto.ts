import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class CreateBannerDto {
  @IsNotEmpty()
  @IsString()
  readonly text: string;

  @IsNotEmpty()
  @IsString()
  readonly image: string;

  @IsNotEmpty()
  @IsNumber()
  readonly position: number;

  @IsOptional()
  @IsBoolean()
  readonly isShow: boolean;

  @IsOptional()
  @IsString()
  readonly link: string;

  @IsOptional()
  @IsString()
  readonly desc: string;
}
