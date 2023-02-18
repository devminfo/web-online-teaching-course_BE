import fs from 'fs';
import { filetypemime } from 'magic-bytes.js';
import { Types } from 'mongoose';
import path from 'path';
import sharp from 'sharp';

import FileManagerService from '@common/c4-file-manager/file-manager.service';
import { StorageServiceNameEnum } from '@enum/storage-service.enum';
import { ShareFunction } from '@helper/static-function';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class UploadLocalService {
  private readonly uploadDir: string | '';

  constructor(
    private logger: CustomLoggerService,
    private fileManagerService: FileManagerService,
  ) {
    this.uploadDir = path.join('./', 'public', 'upload');
  }

  /**
   * Confirm file was used
   * @param userId
   * @param filePath
   * @returns
   */
  async confirmFileWasUsed(userId: Types.ObjectId, filePath: string) {
    const fileTempPath = filePath.split('upload/tmp')[1];

    // check file
    const result = await this.checkFileLocalStorage(fileTempPath);

    // create object
    const fileManagerItem: any = {
      ...result,
      storage: StorageServiceNameEnum.LOCAL_DISK,
      owner: userId,
    };

    // store file to mongodb
    await this.fileManagerService.create(fileManagerItem);

    // return
    return result.file;
  }

  /**
   * Check file local storage
   * @param file
   * @returns
   */
  async checkFileLocalStorage(file: string) {
    const filePath = path.join(this.uploadDir, 'tmp', file);

    // check file path valid
    if (!fs.existsSync(filePath)) throw new Error('File not found');

    // get fileSize and fileMine
    const fileSize = fs.statSync(filePath).size || 0;
    const fileMime = await this.getTypeFileNeedResizeLocalStorage(filePath);

    let result = [];
    const isValidFileMine = fileMime && fileMime.split('/')[0] === 'image';

    // check valid file mine
    if (isValidFileMine) {
      const imageType = fileMime.split('/')[1];

      result = await this.compressImageLocalStorage(filePath, imageType);
    } else {
      result = [await this.moveFileLocalStorage(file, 'tmp', 'file')];
    }

    // replace path
    for (let i = 0; i < result.length; i += 1) {
      result[i] = result[i].replace(
        'public/',
        `${ShareFunction.getClientUrl()}/static/`,
      );
    }

    return { type: fileMime, file: result, size: fileSize };
  }

  async getBufferFromFileLocalStorage(
    filePath: string,
    maxLength: number,
  ): Promise<any[]> {
    return new Promise((resolve, reject) => {
      fs.open(filePath, 'r', (error, fd) => {
        if (error) reject(error);

        const buffer = Buffer.alloc(maxLength);

        fs.read(fd, buffer, 0, maxLength, 0, (err, num) => {
          if (err) reject(err);

          fs.close(fd, () => resolve((<unknown>buffer) as any[]));
        });
      });
    });
  }

  /**
   * get type file need resize LocalStorage
   * @param fielPath
   * @returns
   */
  async getTypeFileNeedResizeLocalStorage(fielPath: string) {
    const buffer = await this.getBufferFromFileLocalStorage(fielPath, 4100);
    const result = filetypemime(buffer);

    // check typemine
    const isValidTypemine = result && result[0] !== null;
    if (isValidTypemine) return result[0];

    return null;
  }

  /**
   * Compress image local storage
   * @param filePath
   * @param imageType
   * @returns
   */
  async compressImageLocalStorage(
    filePath: string,
    imageType: string,
  ): Promise<any[]> {
    if (imageType === 'jpg' || imageType === 'jpeg') {
      return this.compressJPGLocalStorage(filePath);
    }

    if (imageType === 'png') {
      return await this.compressPNGLocalStorage(filePath);
    }

    return [];
  }

  /**
   * get file name localStorage
   * @param filePath
   * @returns
   */
  public getFileNameLocalStorage(filePath: string) {
    const lastIndexOfSlash = filePath.lastIndexOf('/');
    const fileName = filePath.substring(lastIndexOfSlash + 1, filePath.length);

    return fileName;
  }

  /**
   * Resize JPGL in local storage
   * @param filePath
   * @param filePathNew
   * @param size
   * @returns
   */
  async resizeJPGLocalStorage(
    filePath: string,
    filePathNew: string,
    size: number | null,
  ) {
    const quality = +ShareFunction.env().UPLOAD_IMAGE_QUALITY_COMPRESS || 80;

    const semiTransparentRedPng = await sharp(filePath)
      .resize(size)
      .jpeg({ quality })
      .toFile(`${filePathNew}`);

    return semiTransparentRedPng;
  }

  /**
   * resize PNG LocalStorage
   * @param filePath
   * @param filePathNew
   * @param size
   * @returns
   */
  async resizePNGLocalStorage(
    filePath: string,
    filePathNew: string,
    size: number | null,
  ) {
    const quality = +ShareFunction.env().UPLOAD_IMAGE_QUALITY_COMPRESS || 80;

    const semiTransparentRedPng = await sharp(filePath)
      .resize(size)
      .png({ quality })
      .toFile(`${filePathNew}`);

    return semiTransparentRedPng;
  }

  /**
   * Generate all size path localStorage
   * @param filePath
   * @returns
   */
  public generateAllSizePathLocalStorage(filePath: string) {
    const fileName = `${this.getFileNameLocalStorage(filePath)}`;
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
   * Compress JPG LocalStorage
   * @param filePath
   * @returns
   */
  async compressJPGLocalStorage(filePath: string): Promise<any[]> {
    const [
      filePathOriginal,
      filePathXLarge,
      filePathLarge,
      filePathMedium,
      filePathSmall,
      filePathXSmall,
    ] = this.generateAllSizePathLocalStorage(filePath);

    await Promise.all([
      this.resizeJPGLocalStorage(filePath, filePathOriginal, null),
      this.resizeJPGLocalStorage(filePath, filePathXLarge, 1080),
      this.resizeJPGLocalStorage(filePath, filePathLarge, 720),
      this.resizeJPGLocalStorage(filePath, filePathMedium, 480),
      this.resizeJPGLocalStorage(filePath, filePathSmall, 360),
      this.resizeJPGLocalStorage(filePath, filePathXSmall, 150),
    ]);

    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      this.logger.error((err as any).toString());
    }

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
   * compress PNG LocalStorage
   * @param filePath
   * @returns
   */
  async compressPNGLocalStorage(filePath: string): Promise<any[]> {
    // eslint-disable-next-line max-len
    const [
      filePathOriginal,
      filePathXLarge,
      filePathLarge,
      filePathMedium,
      filePathSmall,
      filePathXSmall,
    ] = this.generateAllSizePathLocalStorage(filePath);

    await Promise.all([
      this.resizePNGLocalStorage(filePath, filePathOriginal, null),
      this.resizePNGLocalStorage(filePath, filePathXLarge, 1080),
      this.resizePNGLocalStorage(filePath, filePathLarge, 720),
      this.resizePNGLocalStorage(filePath, filePathMedium, 480),
      this.resizePNGLocalStorage(filePath, filePathSmall, 360),
      this.resizePNGLocalStorage(filePath, filePathXSmall, 150),
    ]);

    try {
      fs.unlinkSync(filePath);
    } catch (err) {
      this.logger.error((err as any).toString());
    }

    return [
      filePathOriginal,
      filePathXLarge,
      filePathLarge,
      filePathMedium,
      filePathSmall,
      filePathXSmall,
    ];
  }

  private async moveFileLocalStorage(
    file: string,
    tmp: string,
    uploadFiles: string,
  ) {
    try {
      const oldPath = path.join(this.uploadDir, tmp, file);
      const newPath = path.join(this.uploadDir, uploadFiles, file);

      fs.renameSync(oldPath, newPath);

      return newPath;
    } catch (err) {
      this.logger.error((err as any).toString());
    }
  }
}
