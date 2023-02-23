import {
  IsNotEmpty, IsNumber, IsOptional, IsString
} from 'class-validator';

export default class CreateCategoryDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  desc: string;

  @IsNotEmpty()
  @IsString()
  thumbnail: string;

  @IsNotEmpty()
  @IsNumber()
  position: number;
}
