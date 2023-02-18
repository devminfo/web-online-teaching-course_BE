import { diskStorage } from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';

import { ShareFunction } from '@helper/static-function';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import S3Service from '@lazy-module/s3/s3.service';
import { Injectable } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';

import { editFileName, imageFileFilter } from './storage.helper';

const fs = require('fs-extra');

@Injectable()
export default class StorageService {
  private multerOptions: any;

  private videoMulterOptions: any;

  private readonly uploadDir: string | '';

  private _isUploadToS3: boolean = false;

  constructor(
    private logger: CustomLoggerService,
    private s3Service: S3Service,
  ) {
    this.uploadDir = path.join('./', 'public', 'upload');
    this.init();
  }

  init() {
    if (this.s3Service.get() !== null) {
      this.initS3Storage();
      this._isUploadToS3 = true;
    } else {
      this.initDiskStorage();
      this._isUploadToS3 = false;
    }
  }

  /**
   * check is uploadToS3
   */
  get isUploadToS3(): boolean {
    return this._isUploadToS3;
  }

  /**
   * get multer options
   * @returns
   */
  get(): MulterOptions {
    return this.multerOptions;
  }

  /**
   * get multer options for upload videos
   * @returns
   */
  getVideoOptions(): MulterOptions {
    return this.videoMulterOptions;
  }

  /**
   * init disk storage
   */
  private initDiskStorage() {
    const fileSize = (+ShareFunction.env().UPLOAD_MAX_SIZE ?? 1) * 1024 * 1024;
    const files = +ShareFunction.env().UPLOAD_MAX_FILE ?? 1;
    const extAllowed = ShareFunction.env().UPLOAD_FILE_EXT;
    const destination = './public/upload/tmp';

    this.multerOptions = {
      limits: { fileSize, files },
      fileFilter: (req: any, file: any, callback: any) => {
        imageFileFilter(extAllowed, req, file, callback);
      },
      storage: diskStorage({ destination, filename: editFileName }),
    } as unknown as MulterOptions;

    // Config video options
    const videoSize = (+ShareFunction.env().VIDEO_MAX_SIZE ?? 10) * 1024 * 1024;
    const videos = +ShareFunction.env().VIDEO_MAX_FILE ?? 1;
    const extVideoAllowed = ShareFunction.env().VIDEO_FILE_EXT;
    const destinationVideo = './public/upload/tmp';

    this.videoMulterOptions = {
      limits: { fileSize: videoSize, files: videos },
      fileFilter: (req: any, file: any, callback: any) => {
        imageFileFilter(extVideoAllowed, req, file, callback);
      },
      storage: diskStorage({
        destination: destinationVideo,
        filename: editFileName,
      }),
    } as unknown as MulterOptions;
  }

  /**
   * init s3 storage
   */
  private initS3Storage() {
    const fileSize = (+ShareFunction.env().UPLOAD_MAX_SIZE ?? 1) * 1024 * 1024;
    const files = +ShareFunction.env().UPLOAD_MAX_FILE ?? 1;
    const extAllowed = ShareFunction.env().UPLOAD_FILE_EXT;
    const bucketPath = `${ShareFunction.env().S3_BUCKET_NAME_PATH}/tmp`;

    this.multerOptions = {
      limits: { fileSize, files },
      fileFilter: (req: any, file: any, callback: any) => imageFileFilter(extAllowed, req, file, callback),
      storage: multerS3({
        s3: this.s3Service.get()!,
        bucket: bucketPath,
        acl: 'public-read',
        key(req, file, cb) {
          editFileName(req, file, cb);
        },
      }),
    } as unknown as MulterOptions;
  }

  /**
   * Remove old file
   */
  async removeOldFile() {
    if (this.isUploadToS3) {
      const bucket = `${ShareFunction.env().S3_BUCKET_NAME_PATH.split('/')[0]}`;
      // eslint-disable-next-line max-len
      const bucketTempFolder = ShareFunction.env().S3_BUCKET_NAME_PATH.split(
        '/',
      )[1]
        ? ShareFunction.env().S3_BUCKET_NAME_PATH.split('/')[1]
        : '';
      const prefix = `${
        ShareFunction.env().S3_BUCKET_NAME_PATH.split('/')[1]
      }/tmp/`;

      const listData = await this.s3Service?.getListFileFromS3(bucket, prefix);
      const currentTimeStamp = Date.now();
      const promiseDeleteFileOlderThan1Days = [];
      if (listData) {
        for (let i = 0; i < listData.Contents.length; i += 1) {
          const timeLastModified = new Date(listData.Contents[i].LastModified);
          if ((currentTimeStamp - +timeLastModified) / 1000 > 86400) {
            promiseDeleteFileOlderThan1Days.push(
              this.deleteFileFromS3(
                listData.Contents[i].Key.replace(`${bucketTempFolder}/`, ''),
              ),
            );
          }
        }
        if (promiseDeleteFileOlderThan1Days.length > 0) await Promise.all(promiseDeleteFileOlderThan1Days);
      }
    } else {
      const tmpPath = path.join(this.uploadDir, 'tmp');
      await fs.emptyDirSync(tmpPath);
    }
  }

  async removeOldFileS3() {
    const bucketPath = ShareFunction.env().S3_BUCKET_NAME_PATH;

    const bucket = `${bucketPath.split('/')[0]}`;

    const bucketTempFolder = bucketPath.split('/')[1]
      ? bucketPath.split('/')[1]
      : '';
    const prefix = `${bucketPath.split('/')[1]}/tmp/`;

    const listData = await this.s3Service?.getListFileFromS3(bucket, prefix);

    const currentTimeStamp = Date.now();

    const promiseDeleteFileOlderThan1Days = [];

    if (listData) {
      for (let i = 0; i < listData.Contents.length; i += 1) {
        const timeLastModified = new Date(listData.Contents[i].LastModified);

        if ((currentTimeStamp - +timeLastModified) / 1000 > 86400) {
          promiseDeleteFileOlderThan1Days.push(
            this.deleteFileFromS3(
              listData.Contents[i].Key.replace(`${bucketTempFolder}/`, ''),
            ),
          );
        }
      }
      if (promiseDeleteFileOlderThan1Days.length > 0) await Promise.all(promiseDeleteFileOlderThan1Days);
    }
  }

  /**
   * Get head from s3
   * @param key
   * @returns
   */
  async getHeadFromS3(key: string): Promise<any> {
    return this.s3Service?.getHeadFromS3(key);
  }

  /**
   * Get file from s3
   * @param key
   * @returns
   */
  async getFileFromS3(key: string): Promise<any> {
    return this.s3Service?.getFileFromS3(key);
  }

  /**
   * Put file from s3
   * @param key
   * @param buffer
   * @param pathFile
   * @returns
   */
  async putFileFromS3(
    key: string,
    buffer: any[],
    pathFile?: string,
  ): Promise<any> {
    return this.s3Service?.putFileFromS3(key, buffer, pathFile);
  }

  /**
   * Delete file from S3
   * @param key
   * @param pathFile
   * @returns
   */
  async deleteFileFromS3(key: string, pathFile?: string): Promise<any> {
    return this.s3Service?.deleteFileFromS3(key, pathFile);
  }

  /**
   * Move file in s3
   * @param key
   * @param pathFile
   * @param newPathFile
   * @returns
   */
  async moveFileS3Storage(
    key: string,
    pathFile: string,
    newPathFile: string,
  ): Promise<any> {
    return this.s3Service?.moveFileS3Storage(key, pathFile, newPathFile);
  }

  /**
   * Serve file from s3
   * @param req
   * @param res
   * @param urlKey
   * @returns
   */
  async serveFileFromS3(req: any, res: any, urlKey: string): Promise<any> {
    return this.s3Service?.serveFileFromS3(req, res, urlKey);
  }
}
