import {
  IsMongoId, IsNotEmpty, IsNumber, IsOptional
} from 'class-validator';
import { ObjectId } from 'mongodb';

export class SelectedServiceDto {
  @IsNotEmpty()
  @IsMongoId()
  idStaff: ObjectId;

  @IsNotEmpty()
  @IsMongoId()
  idStoreService: ObjectId;

  @IsOptional()
  @IsNumber()
  tip: number;
}
