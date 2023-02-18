import {
  IsArray, IsNumber, IsObject, Max
} from 'class-validator';

import { ApiPropertyOptional } from '@nestjs/swagger';

export default class AqpDto {
  @ApiPropertyOptional({
    type: Object,
    default: {},
  })
  @IsObject()
  readonly filter: object = {};

  @ApiPropertyOptional({
    type: Boolean,
    default: 0,
  })
  @IsNumber()
  readonly skip: number = 0;

  @ApiPropertyOptional({
    type: Boolean,
    default: 20,
  })
  @IsNumber()
  @Max(100)
  readonly limit: number = 20;

  @ApiPropertyOptional({
    type: Object,
    default: {},
  })
  @IsObject()
  readonly sort: object = {};

  @ApiPropertyOptional({
    type: Object,
    default: {},
  })
  @IsObject()
  readonly projection: any = {};

  @ApiPropertyOptional({
    type: Array,
    default: [],
  })
  @IsArray()
  readonly population: any[] = [];
}
