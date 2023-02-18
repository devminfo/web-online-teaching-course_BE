import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsOptional,
  ValidateNested,
} from 'class-validator';

import { RoleUserEnum } from '@enum/role-user.enum';

import { GroupDetailType } from 'src/util/types';
import { GroupDetailDto } from './group-detail.dto';

export class updateRolesDto {
  @IsOptional()
  @IsEnum(RoleUserEnum)
  role: RoleUserEnum;

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  groups: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => GroupDetailDto)
  groupDetails: GroupDetailType[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  groupAPIAccesses: string[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  groupAPIDenines: string[];
}
