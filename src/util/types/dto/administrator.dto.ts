import { RoleClassRoomEnum } from '@enum/12.role-class-room.type';
import {
  IsEnum, IsMongoId, IsNumber, IsOptional
} from 'class-validator';

export class AdministratorDto {
  @IsOptional()
  @IsMongoId()
  idUser: string;

  @IsOptional()
  @IsEnum(RoleClassRoomEnum)
  role: RoleClassRoomEnum;
}
