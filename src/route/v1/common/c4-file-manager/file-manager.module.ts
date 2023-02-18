import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import FileManagerController from './file-manager.controller';
import FileManagerRepository from './file-manager.repository';
import FileManagerService from './file-manager.service';
import { FileManager, FileManagerSchema } from './schemas/file-manager.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{
      name: FileManager.name,
      schema: FileManagerSchema,
    }]),
  ],
  controllers: [FileManagerController],
  providers: [FileManagerService, FileManagerRepository],
  exports: [FileManagerService, FileManagerRepository],
})
export default class FileManagerModule {}
