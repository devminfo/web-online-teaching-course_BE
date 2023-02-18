import { ShareFunction } from '@helper/static-function';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import S3Service from '@lazy-module/s3/s3.service';
import {
  Injectable, mixin, NestInterceptor, Type
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import StorageService from './storage.service';

interface StorageVideosInterceptorOptions {
  fieldName: string;
}

function StorageVideosInterceptor(
  options: StorageVideosInterceptorOptions,
): Type<NestInterceptor> {
  @Injectable()
  class Interceptor implements NestInterceptor {
    fileInterceptor: NestInterceptor;

    constructor(
      private logger: CustomLoggerService,
      private s3Service: S3Service,
      private storageService: StorageService,
    ) {
      const multerOptions = storageService.getVideoOptions();
      this.fileInterceptor = new (FilesInterceptor(
        options.fieldName,
        ShareFunction.env().VIDEO_MAX_FILE ?? 1,
        multerOptions,
      ))();
    }

    intercept(...args: Parameters<NestInterceptor['intercept']>) {
      return this.fileInterceptor.intercept(...args);
    }
  }
  return mixin(Interceptor);
}

export default StorageVideosInterceptor;
