import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { ObjectId } from 'mongodb';

import { GenderEnum } from '@enum/1.gender.enum';
import { ReceivedNotificationTypeEnum } from '@enum/7.received-notification-type.enum ';
import { RoleUserEnum, TypeUserEnum } from '@enum/role-user.enum';
import { Type } from 'class-transformer';
import { MyLearningCourseDto } from 'src/util/types/dto/my-learning-course.dto';

export default class CreateUserDto {
  @ValidateIf((o) => o.role === RoleUserEnum.manager)
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  groups: ObjectId[];

  @ValidateIf((o) => o.role === RoleUserEnum.manager)
  @IsOptional()
  @IsArray()
  groupDetails: any[];

  @ValidateIf((o) => o.role === RoleUserEnum.manager)
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  groupAPIAccesses: ObjectId[];

  @ValidateIf((o) => o.role === RoleUserEnum.manager)
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  groupAPIDenines: ObjectId[];

  @IsOptional()
  @IsMongoId()
  readonly idProvince: ObjectId;

  @IsOptional()
  @IsMongoId()
  readonly idDistrict: ObjectId;

  @IsOptional()
  @IsMongoId()
  readonly idVillage: ObjectId;

  @IsOptional()
  @IsMongoId()
  readonly idShop: ObjectId;

  @IsOptional()
  @IsEnum(RoleUserEnum)
  role: RoleUserEnum = RoleUserEnum.customer;

  @IsOptional()
  @IsString()
  readonly fullName: string;

  @IsOptional()
  @IsString()
  readonly phone: string;

  @IsOptional()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @IsString()
  readonly street: string;

  @IsOptional()
  @IsString()
  readonly avatar: string;

  @IsOptional()
  @IsEnum(GenderEnum)
  readonly gender: GenderEnum;

  @IsOptional()
  @IsEnum(TypeUserEnum)
  readonly typeUser: TypeUserEnum;

  @IsOptional()
  @IsString()
  @Length(6, 50)
  password?: string;

  @IsOptional()
  @IsNumber()
  readonly dateOfBirth: number;

  @IsOptional()
  @IsString()
  readonly tokenLogin: string;

  @IsOptional()
  @IsString()
  readonly deviceID: string;

  @IsOptional()
  @IsBoolean()
  readonly isEnableFCM: boolean;

  @IsOptional()
  @IsBoolean()
  readonly isDeleted: boolean;

  @IsOptional()
  @IsArray()
  readonly receivedNotificationTypes: ReceivedNotificationTypeEnum[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly myCourses: string[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MyLearningCourseDto)
  readonly myLearningCourses: MyLearningCourseDto[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly favoriteCourses: string[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly myLearningClassRooms: string[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  readonly myClassRooms: string[];
}
