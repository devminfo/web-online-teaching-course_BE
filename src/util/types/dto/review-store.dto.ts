import { IsNumber, IsOptional, IsString } from 'class-validator';

export class ReviewStoreDto {
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
