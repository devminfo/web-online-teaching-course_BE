import {
  IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString
} from 'class-validator';

import { MethodRouteEnum } from '@enum/method-route.enum';

export default class CreatehistoryDto {
  @IsNotEmpty()
  @IsMongoId()
  idUser: string;

  @IsOptional()
  @IsEnum(MethodRouteEnum)
  method: MethodRouteEnum;

  @IsNotEmpty()
  @IsString()
  url: string;
}
