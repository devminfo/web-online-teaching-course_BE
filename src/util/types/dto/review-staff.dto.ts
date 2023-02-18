import {
  IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString
} from 'class-validator';
import { ObjectId } from 'mongodb';

export class ReviewStaffDto {
  @IsNotEmpty()
  @IsMongoId()
  idStaff: ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  idStoreService: ObjectId;

  @IsOptional()
  @IsString()
  comment: string;

  @IsOptional()
  @IsNumber()
  point: number;

  @IsOptional()
  @IsString({ each: true })
  satisfaction: string[];
}
