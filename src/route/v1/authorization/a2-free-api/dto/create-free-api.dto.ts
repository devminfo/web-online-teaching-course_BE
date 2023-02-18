import {
  IsArray, IsEnum, IsNotEmpty, IsOptional, IsString
} from 'class-validator';

import { MethodRouteEnum } from '@enum/method-route.enum';

export default class CreateFreeApiDto {
  @IsNotEmpty()
  @IsString()
  readonly url: string;

  @IsOptional()
  @IsArray()
  @IsEnum(MethodRouteEnum, { each: true })
  accessMethods: MethodRouteEnum[];

  @IsOptional()
  @IsString()
  collectionName: string;
}
