import {
  IsArray, IsEnum, IsMongoId, IsOptional,
} from 'class-validator';

import { MethodRouteEnum } from '@enum/method-route.enum';

export class GroupDetailDto {
  satisfaction: string[];

  @IsOptional()
  @IsMongoId()
  idGroupDetail: string;

  @IsOptional()
  @IsArray()
  @IsEnum(MethodRouteEnum)
  accessMethods: MethodRouteEnum[];
}
