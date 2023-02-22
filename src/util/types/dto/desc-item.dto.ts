import { IsNumber, IsOptional, IsString } from 'class-validator';

export class DescItemDto {
  @IsOptional()
  @IsNumber()
  position: number;

  @IsOptional()
  @IsString()
  text: string;

  @IsOptional()
  @IsString()
  icon: string;
}
