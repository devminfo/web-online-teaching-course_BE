import { Request } from 'express';
import fs from 'fs';

import BaseService from '@base-inherit/base.service';
import { FileManagerDocument } from '@common/c4-file-manager/schemas/file-manager.schema';
import { routerHelper } from '@helper/router.helper';
import { getAllSchemaFilesHelper } from '@helper/schema-files.helper';
import CustomLoggerService from '@lazy-module/logger/logger.service';
import StorageService from '@lazy-module/storage/storage.service';
import { Injectable } from '@nestjs/common';

import FileManagerRepository from './file-manager.repository';

@Injectable()
export default class FileManagerService extends BaseService<FileManagerDocument> {
  constructor(
    readonly logger: CustomLoggerService,
    readonly repository: FileManagerRepository,
    readonly storageService: StorageService,
  ) {
    super(logger, repository);
  }

  /**
   * Get all schema files
   * @returns
   */
  public async getAllSchemaFiles(req: Request) {
    const schemaFiles = await getAllSchemaFilesHelper();

    const collectionNames = routerHelper.getCollectionNames(req);

    const collectionObj: any = {};

    schemaFiles.forEach((file: { name: string; path: string }) => {
      collectionNames.forEach((cName) => {
        if (cName.startsWith(file.name.slice(0, -1))) {
          collectionObj[cName] = file.path;
        }
      });
    });

    return collectionObj;
  }

  /**
   * Get all ref name in schema
   * @param schemaName
   * @returns
   */
  public async getRefersInCollection(req: Request, schemaName: string) {
    const schemaFiles = await this.getAllSchemaFiles(req);
    const lines = this.getLinesTextInFiles(schemaFiles[schemaName], 'ref:');

    const set = new Set<string>();
    lines.forEach((line) => {
      const refName = line.split('ref:')[1].trim().split(' ')[0].toLowerCase();
      const refNameFormat = `${refName.slice(1, -1)}s`;

      set.add(refNameFormat);
    });

    return [...set];
  }

  /**
   * Search text in files and get line containt it
   * @param fileLocation
   * @param text
   * @returns
   */
  public getLinesTextInFiles(fileLocation: string, text: string): string[] {
    const contents = fs.readFileSync(
      `${process.cwd()}/dist/route/${fileLocation}`,
      {
        encoding: 'utf8',
        flag: 'r',
      },
    );
    const lines = contents.toString().split('\n');

    const results: string[] = [];

    lines.forEach((line) => {
      if (line && line.includes(text)) {
        results.push(line);
      }
    });

    return results;
  }
}
