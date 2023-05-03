import ConversationModule from '@features/f9-conversations/conversation.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import ClassRoomController from './class-room.controller';
import ClassRoomRepository from './class-room.repository';
import ClassRoomService from './class-room.service';
import { ClassRoom, ClassRoomSchema } from './schemas/class-room.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ClassRoom.name,
        schema: ClassRoomSchema,
      },
    ]),
    ConversationModule,
  ],
  controllers: [ClassRoomController],
  providers: [ClassRoomService, ClassRoomRepository],
  exports: [ClassRoomService, ClassRoomRepository],
})
export default class ClassRoomModule {}
