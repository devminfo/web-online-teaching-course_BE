import { SetMetadata } from '@nestjs/common';

export enum MethodRouteEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  HEAD = 'HEAD',
  OPTIONS = 'OPTIONS',
}

export const MethodRoute = (...methodRoute: MethodRouteEnum[]) => SetMetadata('methodRoute', methodRoute);
