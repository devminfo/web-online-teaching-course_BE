import { Type } from 'class-transformer';
import {
  IsArray, IsMongoId, IsOptional, IsString, ValidateNested
} from 'class-validator';

import { GroupDetailDto } from './group-details.dto';

export default class CreateGroupDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GroupDetailDto)
  groupDetails: GroupDetailDto[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  groupAPIAccesses: string[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  groupAPIDenines: string[];
}
