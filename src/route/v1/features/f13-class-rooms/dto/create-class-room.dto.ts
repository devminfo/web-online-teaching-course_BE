import { Type } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AdministratorDto } from 'src/util/types/dto/administrator.dto';

export default class CreateClassRoomDto {
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  members: string[];

  @IsOptional()
  @IsMongoId()
  teacher: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AdministratorDto)
  administrators: AdministratorDto[];

  @IsOptional()
  @IsString()
  readonly desc: string;

  @IsOptional()
  @IsNumber()
  readonly participationFee: number;

  @IsOptional()
  @IsString()
  readonly thumbnail: string;

  @IsOptional()
  @IsNumber()
  readonly publicDate: number;

  @IsOptional()
  @IsNumber()
  readonly maxMembers: number;
}
