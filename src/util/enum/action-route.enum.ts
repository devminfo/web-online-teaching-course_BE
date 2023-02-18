import { SetMetadata } from '@nestjs/common';

export enum ActionRouteEnum {
  GETBYID = 'GETBYID',
  GET = 'GET',
  FINDONE = 'FINDONE',
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  EXPORT = 'EXPORT',
}

export const ActionRoute = (...actionRoute: ActionRouteEnum[]) => SetMetadata('actionRoute', actionRoute);
