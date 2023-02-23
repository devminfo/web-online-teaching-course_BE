import { Type } from 'class-transformer';
import {
  IsArray, IsMongoId, IsNotEmpty, IsOptional, IsString, ValidateNested,
} from 'class-validator';
import { AdministratorDto } from 'src/util/types/dto/administrator.dto';

export default class CreateClassRoomDto {
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  members: string[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  teachers: string[];

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AdministratorDto)
  administrators: AdministratorDto[];

  @IsNotEmpty()
  @IsMongoId({ each: true })
  courses: string[];
}
