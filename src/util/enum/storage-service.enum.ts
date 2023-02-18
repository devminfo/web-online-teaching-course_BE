import { SetMetadata } from '@nestjs/common';

// eslint-disable-next-line no-shadow
export enum StorageServiceNameEnum {
  S3 = 'S3',
  LOCAL_DISK = 'LOCAL_DISK',
}

export const StorageServiceName = (...storageServiceName: StorageServiceNameEnum[]) => SetMetadata('storageServiceName', storageServiceName);
