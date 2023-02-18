import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import GroupDetailController from './group-detail.controller';
import GroupDetailRepository from './group-detail.repository';
import GroupDetailService from './group-detail.service';
import { GroupDetail, GroupDetailSchema } from './schemas/group-detail.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: GroupDetail.name,
        schema: GroupDetailSchema,
      },
    ]),
  ],
  controllers: [GroupDetailController],
  providers: [GroupDetailService, GroupDetailRepository],
  exports: [GroupDetailService, GroupDetailRepository],
})
export default class GroupDetailModule {}
