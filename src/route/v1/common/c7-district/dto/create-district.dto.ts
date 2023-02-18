import { IsMongoId, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export default class CreateDistrictDto {
  @IsOptional()
  @IsMongoId()
  readonly idProvince: Types.ObjectId;

  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  readonly slug: string;
}
