import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty } from 'class-validator';

import { MethodRouteEnum } from '@enum/method-route.enum';

import { AddGroupDetailDto } from './add-group-detail.dto';

export class AddGroupDetailsDto {
  @IsNotEmpty()
  @IsArray()
  @Type(() => AddGroupDetailDto)
  groupDetails: [
    {
      idGroupDetail: String;
      accessMethods: MethodRouteEnum[];
    },
  ];
}
