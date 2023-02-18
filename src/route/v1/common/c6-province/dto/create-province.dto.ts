import { IsOptional, IsString } from 'class-validator';

export default class CreateProvinceDto {
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly slug: string;
}
