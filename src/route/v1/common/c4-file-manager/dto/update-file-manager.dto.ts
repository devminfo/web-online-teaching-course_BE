import { IsOptional, IsString } from 'class-validator';

import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export default class UpdateFileManagerDto {
  @ApiProperty({ type: Array, required: false })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiPropertyOptional({ type: Array, required: false })
  @IsOptional()
  @IsString()
  readonly slug?: string;
}
