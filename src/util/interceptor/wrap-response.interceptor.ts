import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  CallHandler, ExecutionContext, Injectable, NestInterceptor
} from '@nestjs/common';

@Injectable()
export default class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        return data;
      }),
    );
  }
}
