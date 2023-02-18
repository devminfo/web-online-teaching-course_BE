import {
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ObjectId } from 'mongodb';

export default class CreateReviewDto {
  @IsMongoId()
  @IsNotEmpty()
  readonly idOrder: ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  readonly idShipperOrder: ObjectId;

  @IsMongoId()
  @IsNotEmpty()
  readonly idShop: ObjectId;

  @IsOptional()
  @IsBoolean()
  readonly isSatisfied: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly satisfactions: string[];

  @IsOptional()
  @IsString()
  readonly note: string;
}
