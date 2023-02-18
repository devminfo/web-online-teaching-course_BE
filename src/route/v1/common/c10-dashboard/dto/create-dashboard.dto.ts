import { IsOptional } from 'class-validator';

export default class CreateDashboardDto {
  @IsOptional()
  statics: Object;

  @IsOptional()
  image: string;
}
