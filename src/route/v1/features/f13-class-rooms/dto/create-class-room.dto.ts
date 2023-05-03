import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export default class CreateClassRoomDto {
  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  members: string[];

  @IsOptional()
  @IsString()
  thumbnail: string;

  @IsOptional()
  @IsString()
  desc: string;

  @IsNotEmpty()
  @IsMongoId()
  teacher: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsMongoId({ each: true })
  courses: string[];

  @IsOptional()
  @IsNumber()
  readonly startTime: number;

  @IsOptional()
  @IsNumber()
  readonly endTime: number;

  @IsOptional()
  @IsString()
  readonly status: string;
}
