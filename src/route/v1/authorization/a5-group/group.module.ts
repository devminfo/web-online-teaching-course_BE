import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import GroupController from './group.controller';
import GroupRepository from './group.repository';
import GroupService from './group.service';
import { Group, GroupSchema } from './schemas/group.schema';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Group.name,
        schema: GroupSchema,
      },
    ]),
  ],
  controllers: [GroupController],
  providers: [GroupService, GroupRepository],
  exports: [GroupService, GroupRepository],
})
export default class GroupModule {}
