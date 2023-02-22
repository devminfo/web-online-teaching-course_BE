import { IsMongoId, IsOptional, IsString } from 'class-validator';

export class UserInfoDto {
  @IsOptional()
  @IsString()
  fullName: string;

  @IsOptional()
  @IsMongoId()
  idUser: string;

  @IsOptional()
  @IsString()
  avatar: string;

  @IsOptional()
  @IsString()
  slug: string;
}
