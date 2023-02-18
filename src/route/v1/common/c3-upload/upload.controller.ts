import { Express } from 'express';
import { Types } from 'mongoose';

import UploadLocalService from '@common/c3-upload/upload-local.service';
import { GetCurrentUserId } from '@decorator/get-current-user-id.decorator';
import { ShareFunction } from '@helper/static-function';
import WrapResponseInterceptor from '@interceptor/wrap-response.interceptor';
import StorageVideosInterceptor from '@lazy-module/storage/storage-video.interceptor';
import StorageFileInterceptor from '@lazy-module/storage/storage.interceptor';
import StorageService from '@lazy-module/storage/storage.service';
import {
  Body, Controller, HttpCode, NotImplementedException, Post, UploadedFiles, UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import UploadS3Service from './upload-s3.service';

@ApiTags('Upload')
@UseInterceptors(WrapResponseInterceptor)
@Controller()
export default class UploadController {
  constructor(
    private uploadLocalService: UploadLocalService,
    private uploadS3Service: UploadS3Service,
    private storageService: StorageService,
  ) {}

  /**
   * Upload multiple files to temp localstorage
   * @param files
   * @returns
   */
  @Post('')
  @HttpCode(201)
  @UseInterceptors(StorageFileInterceptor({ fieldName: 'files' }))
  async uploadMultipleFilesLocal(
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const result = [];
    for (let i = 0; i < files.length; i += 1) {
      result.push(
        files[i].path.replace(
          'public/',
          `${ShareFunction.getClientUrl()}/static/`,
        ),
      );
    }
    return { files: result };
  }

  /**
   * Upload multiple videos to temp localstorage
   * @param videos
   * @returns
   */
  @Post('/videos')
  @HttpCode(201)
  @UseInterceptors(StorageVideosInterceptor({ fieldName: 'videos' }))
  async uploadMultipleVideosLocal(
    @UploadedFiles() videos: Express.Multer.File[],
  ) {
    const result = [];
    for (let i = 0; i < videos.length; i += 1) {
      result.push(
        videos[i].path.replace(
          'public/',
          `${ShareFunction.getClientUrl()}/static/`,
        ),
      );
    }
    return { files: result };
  }

  /**
   * Upload multiple files to temp s3 Storage
   * @param files
   * @returns
   */
  @Post('/s3')
  @HttpCode(201)
  @UseInterceptors(StorageFileInterceptor({ fieldName: 'files' }))
  async uploadMultipleFilesS3(@UploadedFiles() files: Express.Multer.File[]) {
    const result = [];

    // check enable upload s3
    if (!this.storageService.isUploadToS3) throw new NotImplementedException('Does not support uploading s3');

    for (let i = 0; i < files.length; i += 1) {
      result.push(`upload/tmp/${(files[i] as any).key}`);
    }

    return result;
  }

  /**
   * Confirm files was used in local
   * @param userId
   * @param files
   * @returns
   */
  @Post('local-tmp/')
  async confirmFilesWasUsedLocal(
    @GetCurrentUserId() userId: Types.ObjectId,
    @Body('files') files: string[],
  ) {
    const filesConfirmed: string[][] = [];
    const fileToConfirm: string[] = [];

    files.forEach((file) => {
      // check file confirmed
      if (
        file.startsWith(`${ShareFunction.getClientUrl()}/static/upload/image/`)
      ) {
        filesConfirmed.push([file]);
      } else {
        // file to confirm
        fileToConfirm.push(file);
      }
    });

    // save list file
    const filesWasUsedPromise = fileToConfirm.map((file) => {
      return this.uploadLocalService.confirmFileWasUsed(userId, file);
    });

    // run promise
    const result = await Promise.all(filesWasUsedPromise);

    // success
    return [...filesConfirmed, ...result];
  }

  /**
   * Confirm files was used in s3
   * @param userId
   * @param files
   * @returns
   */
  @Post('s3-tmp/')
  async confirmFilesWasUsedS3(
    @GetCurrentUserId() userId: string,
    @Body('files') files: string[],
  ) {
    // save list file
    const filesWasUsedPromise = files.map((file) => {
      return this.uploadS3Service.confirmFileWasUsed(userId, file);
    });

    // run promise
    const result = Promise.all(filesWasUsedPromise);

    // success
    return result;
  }
}
