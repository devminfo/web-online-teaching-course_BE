import {
  IsArray, IsBoolean, IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString,
} from 'class-validator';

export default class CreateGroupDetailDto {
  @IsNotEmpty()
  @IsString()
  collectionName: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  refers: string[];

  @IsOptional()
  @IsBoolean()
  isGroup?: boolean;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsNumber()
  position?: number;

  @IsOptional()
  @IsString()
  link?: string;

  @IsOptional()
  @IsBoolean()
  isHorizontalMenu?: boolean;
}
