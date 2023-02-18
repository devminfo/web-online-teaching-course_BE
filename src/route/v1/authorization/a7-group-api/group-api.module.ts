import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import GroupApiController from './group-api.controller';
import GroupApiRepository from './group-api.repository';
import GroupApiService from './group-api.service';
import { GroupApi, GroupApiSchema } from './schemas/group-api.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: GroupApi.name,
        schema: GroupApiSchema,
      },
    ]),
  ],
  controllers: [GroupApiController],
  providers: [GroupApiService, GroupApiRepository],
  exports: [GroupApiService, GroupApiRepository],
})
export default class GroupApiModule {}
