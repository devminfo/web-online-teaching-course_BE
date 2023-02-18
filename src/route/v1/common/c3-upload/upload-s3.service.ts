import { filetypemime } from 'magic-bytes.js';
import { Types } from 'mongoose';
import path from 'path';
import sharp from 'sharp';

import FileManagerService from '@common/c4-file-manager/file-manager.service';
import { StorageServiceNameEnum } from '@enum/storage-service.enum';
import { ShareFunction } from '@helper/static-function';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import StorageService from '@lazy-module/storage/storage.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class UploadS3Service {
  private readonly uploadDir: string | '';

  constructor(
    private logger: CustomLoggerService,
    private storageService: StorageService,
    private fileManagerService: FileManagerService,
  ) {
    this.uploadDir = path.join('upload');
  }

  /**
   * Confirm file was used
   * @param userId
   * @param filePath
   * @returns
   */
  async confirmFileWasUsed(userId: Types.ObjectId, filePath: string) {
    const result = await this.checkFileS3Storage(filePath);

    // create objectFileManager item
    const fileManagerItem = {
      ...result,
      storage: StorageServiceNameEnum.S3,
      owner: userId,
    };

    // store file to mongodb
    await this.fileManagerService.create(fileManagerItem);

    // return
    return result.file;
  }

  /**
   * Check file s3 storage
   * @param file
   * @returns
   */
  async checkFileS3Storage(file: string) {
    const files = await this.storageService.getFileFromS3(file);

    const fileSize = files.ContentLength || 0;

    const resultFileFromS3Bufer = files.Body;

    const fileMime = await this.getTypeFileNeedResizeS3Storage(
      resultFileFromS3Bufer,
    );

    let result = [];
    const isFileMine = fileMime && fileMime.split('/')[0] === 'image';
    // check fileMine is "image"
    if (isFileMine) {
      const imageType = fileMime.split('/')[1];

      result = await this.compressImageS3Storage(
        file,
        resultFileFromS3Bufer,
        imageType,
      );
    } else {
      result = [
        await this.storageService.moveFileS3Storage(file, 'tmp', 'upload/file'),
      ];
    }

    for (let i = 0; i < result.length; i += 1) {
      result[i] = result[i].replace('public/', '');
    }
    return { type: fileMime, file: result, size: fileSize };
  }

  /**
   * Get type file need resize S3
   * @param buffer
   * @returns
   */
  async getTypeFileNeedResizeS3Storage(buffer: any[]) {
    const result = filetypemime(buffer);

    // check typemine
    const isValidTypemine = result && result.length === 1 && result[0] !== null;

    if (isValidTypemine) return result[0];

    return null;
  }

  /**
   * compress image s3
   * @param file
   * @param buffer
   * @param imageType
   * @returns
   */
  async compressImageS3Storage(
    file: string,
    buffer: any[],
    imageType: string,
  ): Promise<any[]> {
    if (imageType === 'jpg' || imageType === 'jpeg') {
      return this.compressJPGS3Storage(file, buffer);
    }

    if (imageType === 'png') {
      return this.compressPNGS3Storage(file, buffer);
    }

    return [];
  }

  /**
   * resize JPG in S3 Storage
   * @param buffer
   * @param filePathNew
   * @param size
   * @returns
   */
  async resizeJPGS3Storage(
    buffer: any[],
    filePathNew: string,
    size: number | null,
    quality = +ShareFunction.env().UPLOAD_IMAGE_QUALITY_COMPRESS || 80,
  ) {
    const semiTransparentRedJpg = await sharp(buffer as unknown as Buffer)
      .resize(size)
      .jpeg({ quality })
      .toBuffer();

    // put file from s3
    await this.storageService.putFileFromS3(
      filePathNew,
      semiTransparentRedJpg as unknown as any[],
    );

    // success
    return semiTransparentRedJpg;
  }

  /**
   * Resize file PNG in S3 storage
   * @param buffer
   * @param filePathNew
   * @param size
   * @returns
   */
  async resizePNGS3Storage(
    buffer: any[],
    filePathNew: string,
    size: number | null,
    quality = +ShareFunction.env().UPLOAD_IMAGE_QUALITY_COMPRESS || 80,
  ) {
    const semiTransparentRedPng = await sharp(buffer as unknown as Buffer)
      .resize(size)
      .png({ quality })
      .toBuffer();

    // put file from s3
    await this.storageService.putFileFromS3(
      filePathNew,
      semiTransparentRedPng as unknown as any[],
    );

    // success
    return semiTransparentRedPng;
  }

  /**
   * Generate all size path in S3 Storage
   * @param filePath
   * @returns
   */
  public generateAllSizePathS3Storage(filePath: string) {
    const fileName = `${this.getFileName(filePath)}`;

    const [
      filePathOriginal,
      filePathXLarge,
      filePathLarge,
      filePathMedium,
      filePathSmall,
      filePathXSmall,
    ] = [
      path.join(this.uploadDir, 'image', `${fileName}`),
      path.join(this.uploadDir, 'image', `xl_${fileName}`),
      path.join(this.uploadDir, 'image', `lg_${fileName}`),
      path.join(this.uploadDir, 'image', `md_${fileName}`),
      path.join(this.uploadDir, 'image', `sm_${fileName}`),
      path.join(this.uploadDir, 'image', `xs_${fileName}`),
    ];

    return [
      filePathOriginal,
      filePathXLarge,
      filePathLarge,
      filePathMedium,
      filePathSmall,
      filePathXSmall,
    ];
  }

  /**
   * compress JPG in S3
   * @param filePath
   * @param buffer
   * @returns
   */
  async compressJPGS3Storage(filePath: string, buffer: any[]): Promise<any[]> {
    const [
      filePathOriginal,
      filePathXLarge,
      filePathLarge,
      filePathMedium,
      filePathSmall,
      filePathXSmall,
    ] = this.generateAllSizePathS3Storage(filePath);

    await Promise.all([
      this.resizeJPGS3Storage(buffer, filePathOriginal, null),
      this.resizeJPGS3Storage(buffer, filePathXLarge, 1080),
      this.resizeJPGS3Storage(buffer, filePathLarge, 720),
      this.resizeJPGS3Storage(buffer, filePathMedium, 480),
      this.resizeJPGS3Storage(buffer, filePathSmall, 360),
      this.resizeJPGS3Storage(buffer, filePathXSmall, 150),
    ]);

    // remove file in folder tmp
    try {
      await this.storageService.deleteFileFromS3(filePath, 'tmp');
    } catch (err: any) {
      this.logger.error(err.toString());
    }

    // success
    return [
      filePathOriginal,
      filePathXLarge,
      filePathLarge,
      filePathMedium,
      filePathSmall,
      filePathXSmall,
    ];
  }

  /**
   * compress PNG in S3 Storage
   * @param filePath
   * @param buffer
   * @returns
   */
  async compressPNGS3Storage(filePath: string, buffer: any[]): Promise<any[]> {
    // eslint-disable-next-line max-len
    const [
      filePathOriginal,
      filePathXLarge,
      filePathLarge,
      filePathMedium,
      filePathSmall,
      filePathXSmall,
    ] = this.generateAllSizePathS3Storage(filePath);

    await Promise.all([
      this.resizePNGS3Storage(buffer, filePathOriginal, null),
      this.resizePNGS3Storage(buffer, filePathXLarge, 1080),
      this.resizePNGS3Storage(buffer, filePathLarge, 720),
      this.resizePNGS3Storage(buffer, filePathMedium, 480),
      this.resizePNGS3Storage(buffer, filePathSmall, 360),
      this.resizePNGS3Storage(buffer, filePathXSmall, 150),
    ]);

    try {
      await this.storageService.deleteFileFromS3(filePath, 'tmp');
    } catch (err: any) {
      this.logger.error(err.toString());
    }

    // success
    return [
      filePathOriginal,
      filePathXLarge,
      filePathLarge,
      filePathMedium,
      filePathSmall,
      filePathXSmall,
    ];
  }

  /**
   * Get file name in S3
   * @param filePath
   * @returns
   */
  private getFileName(filePath: string) {
    const lastIndexOfSlash = filePath.lastIndexOf('/');

    const fileName = filePath.substring(lastIndexOfSlash + 1, filePath.length);

    return fileName;
  }
}
