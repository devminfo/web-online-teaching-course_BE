import { IsOptional, IsString } from 'class-validator';

export default class CreateSettingDto {
  @IsOptional()
  @IsString()
  readonly logo: string;

  @IsOptional()
  @IsString()
  readonly policy: string;

  @IsOptional()
  @IsString()
  readonly timeZoneServer: string;

  @IsOptional()
  @IsString()
  readonly timeZoneApp: string;

  @IsOptional()
  @IsString()
  readonly accountName: string;

  @IsOptional()
  @IsString()
  readonly accountNumber: string;

  @IsOptional()
  @IsString()
  readonly bankName: string;

  @IsOptional()
  @IsString()
  readonly bankBranch: string;
}
