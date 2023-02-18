import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ProductDetailDto {
  @IsOptional()
  @IsNumber()
  weight: number;

  @IsOptional()
  @IsNumber()
  height: number;

  @IsOptional()
  @IsNumber()
  width: number;

  @IsOptional()
  @IsNumber()
  length: number;

  @IsOptional()
  @IsString()
  note: string;
}
