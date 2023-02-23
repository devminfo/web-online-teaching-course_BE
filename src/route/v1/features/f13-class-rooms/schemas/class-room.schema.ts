import { Document } from 'mongoose';
import { AdministratorDto } from 'src/util/types/dto/administrator.dto';

import { RoleClassRoomEnum } from '@enum/12.role-class-room.type';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true, versionKey: false })
export class ClassRoom {
  @Prop({ type: [{ type: String, ref: 'User' }], default: [] })
  members: string[];

  @Prop({ type: [{ type: String, ref: 'User' }], default: [] })
  teachers: string[];

  @Prop({ type: String, default: '' })
  name: string;

  @Prop({
    type: [
      {
        idUser: { type: String, ref: 'User' },
        role: {
          type: String,
          enum: RoleClassRoomEnum,
          default: RoleClassRoomEnum.USER,
        },
      },
    ],
    default: [],
  })
  administrators: AdministratorDto[];

  @Prop({ type: [{ type: String, ref: 'Course' }], default: [] })
  courses: string[];
}

export type ClassRoomDocument = ClassRoom & Document;
export const ClassRoomSchema = SchemaFactory.createForClass(ClassRoom);
