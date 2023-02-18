import CustomLoggerService from '@lazy-module/logger/logger.service';
import StorageService from '@lazy-module/storage/storage.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class StaticS3Service {
  constructor(
    private logger: CustomLoggerService,
    private storageService: StorageService,
  ) {
  }

  async serveFileFromS3(req: any, res: any, urlKey: string) {
    return this.storageService?.serveFileFromS3(req, res, urlKey);
  }
}
