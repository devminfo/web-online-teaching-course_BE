import { IsNumber, IsOptional } from 'class-validator';

export class StoreAssetQuantityDto {
  @IsOptional()
  @IsNumber()
  used: number;

  @IsOptional()
  @IsNumber()
  total: number;
}
